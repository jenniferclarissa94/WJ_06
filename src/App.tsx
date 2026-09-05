import { useState } from 'react';
import BottomNav from './components/BottomNav';
import HomeView from './views/HomeView';
import CulinaryView from './views/CulinaryView';
import EventsView from './views/EventsView';
import NewsView from './views/NewsView';
import ProfileView from './views/ProfileView';
import SpotDetailView from './views/SpotDetailView';
import EventDetailView from './views/EventDetailView';
import NewsDetailView from './views/NewsDetailView';
import SettingsView from './views/SettingsView';
import LovedSpotsView from './views/LovedSpotsView';
import MyTipsView from './views/MyTipsView';
import NotificationSettingsView from './views/NotificationSettingsView';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import GeminiModal from './components/GeminiModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [detailView, setDetailView] = useState<{type: string, id: string} | null>(null);
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [geminiInitialPrompt, setGeminiInitialPrompt] = useState<string | undefined>(undefined);

  const handleOpenGemini = (prompt?: string) => {
    setGeminiInitialPrompt(prompt);
    setIsGeminiOpen(true);
  };

  const navigateTab = (tab: string) => {
    setCurrentTab(tab);
    setDetailView(null);
  };

  const renderView = () => {
    if (detailView) {
      switch (detailView.type) {
        case 'spot': return <SpotDetailView id={detailView.id} onBack={() => setDetailView(null)} onRequireLogin={() => setDetailView({type: 'login', id: ''})} onOpenGemini={handleOpenGemini} />;
        case 'event': return <EventDetailView id={detailView.id} onBack={() => setDetailView(null)} onOpenGemini={handleOpenGemini} />;
        case 'news': return <NewsDetailView id={detailView.id} onBack={() => setDetailView(null)} onNavigateToNews={(newId) => setDetailView({type: 'news', id: newId})} onOpenGemini={handleOpenGemini} />;
        case 'settings': return <SettingsView onBack={() => setDetailView(null)} />;
        case 'loved_spots': return <LovedSpotsView onBack={() => setDetailView(null)} navigateDetail={(type, id) => setDetailView({type, id})} />;
        case 'my_tips': return <MyTipsView onBack={() => setDetailView(null)} navigateDetail={(type, id) => setDetailView({type, id})} />;
        case 'notifications': return <NotificationSettingsView onBack={() => setDetailView(null)} />;
        case 'login': return <LoginView onBack={() => setDetailView(null)} onNavigateToSignUp={() => setDetailView({type: 'signup', id: ''})} />;
        case 'signup': return <SignUpView onBack={() => setDetailView(null)} />;
      }
    }

    switch (currentTab) {
      case 'home':
        return <HomeView navigate={navigateTab} navigateDetail={(type, id) => setDetailView({type, id})} onOpenGemini={handleOpenGemini} />;
      case 'culinary':
        return <CulinaryView navigateDetail={(type, id) => setDetailView({type, id})} onOpenGemini={handleOpenGemini} />;
      case 'events':
        return <EventsView navigateDetail={(type, id) => setDetailView({type, id})} onOpenGemini={handleOpenGemini} />;
      case 'news':
        return <NewsView navigateDetail={(type, id) => setDetailView({type, id})} onOpenGemini={handleOpenGemini} />;
      case 'profile':
        return <ProfileView navigateDetail={(type, id) => setDetailView({type, id})} onOpenGemini={handleOpenGemini} />;
      default:
        return <HomeView navigate={navigateTab} navigateDetail={(type, id) => setDetailView({type, id})} onOpenGemini={handleOpenGemini} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white w-full h-full relative">
      {/* Background ambient glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-secondary)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Content Area */}
      <main className="relative z-10 w-full min-h-screen">
        {renderView()}
      </main>

      {/* Navigation */}
      <BottomNav currentTab={currentTab} onTabChange={navigateTab} />

      {/* Gemini AI Assistant Modal */}
      <GeminiModal 
        isOpen={isGeminiOpen} 
        onClose={() => {
          setIsGeminiOpen(false);
          setGeminiInitialPrompt(undefined);
        }} 
        initialPrompt={geminiInitialPrompt} 
      />
    </div>
  );
}
