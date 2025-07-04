import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import './Header.css';

const Header: React.FC = () => {
  const { currentUser, userData, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>🎉 Party QC</h1>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/event/1" className="nav-link">Événements</Link>
          </nav>
          <div className="auth-section">
            {currentUser ? (
              <div className="user-menu">
                <span className="user-name">Bonjour, {userData?.displayName || currentUser.email}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  onClick={() => handleAuthClick('login')}
                  className="auth-btn login-btn"
                >
                  Connexion
                </button>
                <button 
                  onClick={() => handleAuthClick('register')}
                  className="auth-btn register-btn"
                >
                  Inscription
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header; 