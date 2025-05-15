import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="w-full max-w-md p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper; 