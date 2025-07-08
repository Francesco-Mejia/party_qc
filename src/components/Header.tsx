import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';
const BarsIcon = FaBars as unknown as React.FC<{ size?: number }>;
const TimesIcon = FaTimes as unknown as React.FC<{ size?: number }>;

const Header: React.FC = () => {
  const { currentUser, userData, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="header-right">
            <span className="user-name-mobile">{currentUser ? `Bonjour, ${userData?.displayName || currentUser.email}` : ''}</span>
            <button className="hamburger" onClick={() => setMobileMenuOpen(true)} aria-label="Ouvrir le menu">
              <BarsIcon size={24} />
            </button>
          </div>
          <nav className="nav desktop-nav">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/event/1" className="nav-link">Événements</Link>
          </nav>
          <div className="auth-section desktop-auth">
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
        {/* Menu mobile overlay */}
        {mobileMenuOpen && (
          <div className="mobile-menu mobile-menu-open">
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Fermer le menu">
              <TimesIcon size={24} />
            </button>
            <nav className="mobile-nav">
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
              <Link to="/event/1" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Événements</Link>
              {currentUser ? (
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="logout-btn">Déconnexion</button>
              ) : (
                <>
                  <button onClick={() => { handleAuthClick('login'); setMobileMenuOpen(false); }} className="auth-btn login-btn">Connexion</button>
                  <button onClick={() => { handleAuthClick('register'); setMobileMenuOpen(false); }} className="auth-btn register-btn">Inscription</button>
                </>
              )}
            </nav>
          </div>
        )}
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