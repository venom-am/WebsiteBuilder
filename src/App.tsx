import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WebsiteProvider } from './context/WebsiteContext';
import LandingPage from './pages/LandingPage';
import WebsiteBuilder from './pages/WebsiteBuilder';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SignIn, SignUp } from '@clerk/clerk-react';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthWrapper from './components/auth/AuthWrapper';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <WebsiteProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/sign-in" 
              element={
                <AuthWrapper>
                  <SignIn 
                    routing="path" 
                    path="/sign-in"
                    redirectUrl="/builder"
                    signUpUrl="/sign-up"
                  />
                </AuthWrapper>
              } 
            />
            <Route 
              path="/sign-up" 
              element={
                <AuthWrapper>
                  <SignUp 
                    routing="path" 
                    path="/sign-up"
                    redirectUrl="/builder"
                    signInUrl="/sign-in"
                  />
                </AuthWrapper>
              } 
            />
            <Route
              path="/builder"
              element={
                <ProtectedRoute>
                  <WebsiteBuilder />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </WebsiteProvider>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;