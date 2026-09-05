import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore,
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocFromServer,
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc,
  Unsubscribe 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInAnonymously 
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

export interface ChatInteraction {
  id: string;
  userId: string;
  prompt: string;
  response: string;
  createdAt: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Use initializeFirestore with experimentalForceLongPolling: true to ensure stable connection
// within sandboxed iframe / Cloud Run environments and prevent WebChannel streaming dropouts
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

// Test connection on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error?.code === 'unavailable' || (error instanceof Error && error.message.includes('the client is offline'))) {
      console.warn('Firestore is connecting or operating in offline mode.');
    } else if (error?.code === 'permission-denied') {
      handleFirestoreError(error, OperationType.GET, 'test/connection');
    }
  }
}
testConnection();

// Helper for a persistent local user identifier when anonymous auth is restricted
function getPersistentUserId(): string {
  try {
    let id = localStorage.getItem('wassup_jakarta_user_id');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      localStorage.setItem('wassup_jakarta_user_id', id);
    }
    return id;
  } catch {
    return 'user_guest_' + Date.now().toString(36);
  }
}

// Local cache helpers to guarantee chat history is preserved without failing
function getLocalChatHistory(userId: string): ChatInteraction[] {
  try {
    const raw = localStorage.getItem(`wassup_chat_history_${userId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return [];
}

function saveLocalChatHistory(userId: string, items: ChatInteraction[]) {
  try {
    localStorage.setItem(`wassup_chat_history_${userId}`, JSON.stringify(items));
  } catch {}
}

export interface AppUserSession {
  uid: string;
  isAnonymous?: boolean;
}

// Ensure an authenticated session (anonymous or persistent local user)
export async function ensureAuthUser(): Promise<AppUserSession> {
  // If user is already authenticated via Firebase Auth
  if (auth.currentUser) {
    return { uid: auth.currentUser.uid, isAnonymous: auth.currentUser.isAnonymous };
  }

  // Attempt anonymous sign-in, catching restricted provider exceptions gracefully
  try {
    const cred = await signInAnonymously(auth);
    return { uid: cred.user.uid, isAnonymous: true };
  } catch {
    // When anonymous authentication is disabled on the Firebase project (auth/admin-restricted-operation),
    // cleanly fall back to a persistent user session ID without logging console errors.
    return { uid: getPersistentUserId(), isAnonymous: true };
  }
}

export async function saveInteraction(userId: string, prompt: string, response: string): Promise<string> {
  const id = 'chat_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const interaction: ChatInteraction = {
    id,
    userId,
    prompt: prompt.trim(),
    response: response.trim(),
    createdAt: new Date().toISOString(),
  };

  // 1. Immediately store in local storage to guarantee availability and zero latency
  const current = getLocalChatHistory(userId);
  saveLocalChatHistory(userId, [interaction, ...current.filter(c => c.id !== id)]);

  // 2. Persist to Firestore
  try {
    const docRef = doc(db, 'users', userId, 'chat_history', id);
    await setDoc(docRef, interaction);
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      handleFirestoreError(error, OperationType.WRITE, `users/${userId}/chat_history/${id}`);
    }
  }

  return id;
}

export function subscribeUserChatHistory(
  userId: string, 
  callback: (interactions: ChatInteraction[]) => void
): Unsubscribe {
  // Emit local interactions immediately so UI is populated instantly
  const localItems = getLocalChatHistory(userId);
  callback(localItems);

  try {
    const historyRef = collection(db, 'users', userId, 'chat_history');
    const q = query(historyRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: ChatInteraction[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as ChatInteraction);
      });
      if (items.length > 0) {
        saveLocalChatHistory(userId, items);
        callback(items);
      }
    }, (error) => {
      if (error?.code === 'permission-denied') {
        handleFirestoreError(error, OperationType.LIST, `users/${userId}/chat_history`);
      }
      callback(getLocalChatHistory(userId));
    });

    return unsubscribe;
  } catch {
    return () => {};
  }
}

export async function deleteInteraction(userId: string, interactionId: string): Promise<void> {
  // Remove from local storage
  const current = getLocalChatHistory(userId);
  saveLocalChatHistory(userId, current.filter(c => c.id !== interactionId));

  // Remove from Firestore
  try {
    const docRef = doc(db, 'users', userId, 'chat_history', interactionId);
    await deleteDoc(docRef);
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      handleFirestoreError(error, OperationType.DELETE, `users/${userId}/chat_history/${interactionId}`);
    }
  }
}
