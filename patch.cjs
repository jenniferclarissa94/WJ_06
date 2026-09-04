const fs = require('fs');

function applyCreatePortal(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    if (!content.includes("createPortal")) {
        content = content.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { createPortal } from 'react-dom';");
    }
    
    // For selectedImage
    content = content.replace(
        "{selectedImage && (",
        "{selectedImage && typeof document !== 'undefined' && createPortal("
    );
    // Replace the closing tag for selectedImage
    // It's a bit tricky with regex, let's just do simple replacement
    let target1 = `          <img src={selectedImage} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
        </div>
      )}`;
    let replacer1 = `          <img src={selectedImage} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
        </div>,
        document.body
      )}`;
    content = content.replace(target1, replacer1);

    // For showShareMenu (in SpotDetailView)
    if (content.includes("{showShareMenu && (")) {
        content = content.replace(
            "{showShareMenu && (",
            "{showShareMenu && typeof document !== 'undefined' && createPortal("
        );
        let target2 = `              </button>
            </div>
          </div>
        </div>
      )}`;
        let replacer2 = `              </button>
            </div>
          </div>
        </div>,
        document.body
      )}`;
        content = content.replace(target2, replacer2);
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
}

applyCreatePortal('src/views/SpotDetailView.tsx');
applyCreatePortal('src/views/EventDetailView.tsx');
