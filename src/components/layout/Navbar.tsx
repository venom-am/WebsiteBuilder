import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { useTheme } from '../../context/ThemeProvider';

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartBuilding = () => {
    if (isSignedIn) {
      navigate('/builder');
    } else {
      navigate('/sign-in');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent cursor-pointer hover:from-pink-600 hover:to-violet-600 transition-all"
            onClick={() => navigate('/')}
          >
            Website Builder
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white/80 hover:text-white font-medium transition-all hover:scale-105"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-white font-medium transition-all hover:scale-105"
            >
              Contact
            </button>
            <button
              onClick={handleStartBuilding}
              className="text-white/80 hover:text-white font-medium transition-all hover:scale-105"
            >
              Start Building
            </button>
            {isSignedIn && (
              <button
                onClick={handleSignOut}
                className="text-white/80 hover:text-white font-medium transition-all hover:scale-105 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 