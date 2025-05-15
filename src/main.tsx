import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: undefined,
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600',
          footerActionLink: 'text-white hover:text-white/80',
          formFieldInput: 'bg-white/10 border-white/20 text-white',
          formFieldLabel: 'text-white',
          formFieldInputShowPasswordButton: 'text-white',
          identityPreviewEditButton: 'text-white',
          formFieldAction: 'text-white',
          footerAction: 'text-white',
          card: 'bg-transparent shadow-none',
          headerTitle: 'text-white',
          headerSubtitle: 'text-white/80',
          socialButtonsBlockButton: 'bg-white/10 border-white/20 text-white hover:bg-white/20',
          socialButtonsBlockButtonArrow: 'text-white',
          socialButtonsBlockButtonText: 'text-white',
          dividerLine: 'bg-white/20',
          dividerText: 'text-white/80',
          formFieldWarningText: 'text-red-400',
          formFieldErrorText: 'text-red-400',
          identityPreviewText: 'text-white',
          formFieldSuccessText: 'text-green-400',
          alertText: 'text-white',
          alert: 'bg-white/10 border-white/20',
        }
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
