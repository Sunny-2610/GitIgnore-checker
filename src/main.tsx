import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { LanguageProvider } from './components/LanguageContext.tsx';
import { TooltipProvider } from './components/ui/tooltip'; // Add this import

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <TooltipProvider> {/* Add this wrapper */}
        <App />
      </TooltipProvider>
    </LanguageProvider>
  </StrictMode>
);