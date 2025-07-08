import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { seedService } from '../services/seedService';
import { Event } from '../types';
import './Home.css';

const Home: React.FC = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        // Initialiser la base de données si elle est vide
        await seedService.initializeIfEmpty();
        
        // Récupérer les événements à venir (limités à 6)
        const events = await eventService.getUpcomingEvents(6);
        setFeaturedEvents(events);
      } catch (err) {
        setError('Erreur lors du chargement des événements');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="home">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des événements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="error-container">
          <p>Erreur: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>🎉 Les Meilleurs Événements du Québec</h1>
          <p>Réservez vos places pour les soirées les plus en vogue de la province</p>
          <Link to="/event/1" className="cta-button">
            Voir les Événements
          </Link>
        </div>
      </section>

      <section className="featured-events">
        <div className="container">
          <h2>Événements Vedettes</h2>
          <div className="events-grid">
            {/* Événement spécial - CONTINENT À QUÉBEC */}
            <Link to="/event/1" className="event-card special-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="event-image special-image">
                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800" alt="CONTINENT À QUÉBEC" />
                <div className="event-price">$20</div>
              </div>
              <div className="event-content special-content">
                <h3 className="special-title">CONTINENT À QUÉBEC (SOIRÉE AFRICAINE)</h3>
                <div className="event-details">
                  <p><strong>📅</strong> {formatDate("2025-08-10")} <strong>🕒</strong> 21:00 - 03:00</p>
                  <p><strong>📍</strong> Centre communautaire de Québec</p>
                </div>
                <p className="event-description special-description">Une soirée africaine authentique avec musique traditionnelle et moderne, danse africaine. Ambiance festive et culturelle garantie.</p>
              </div>
            </Link>
            
            {/* Événements chargés depuis la base de données */}
            {featuredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.imageUrl} alt={event.title} />
                  <div className="event-price">${event.price}</div>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <p><strong>📅 Date:</strong> {formatDate(event.date)}</p>
                    <p><strong>🕒 Heure:</strong> {event.time}</p>
                    <p><strong>📍 Lieu:</strong> {event.location}</p>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <Link to={`/event/${event.id}`} className="book-button">
                    Réserver Maintenant
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Pourquoi Choisir Party QC?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">💳</div>
              <h3>Paiement Sécurisé</h3>
              <p>Paiement par carte de crédit, débit ou Apple Pay avec Stripe</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📧</div>
              <h3>Confirmation Instantanée</h3>
              <p>Recevez votre billet et facture par email immédiatement</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎫</div>
              <h3>Billets Numériques</h3>
              <p>Vos billets sont envoyés directement sur votre téléphone</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔄</div>
              <h3>Réservation Simple</h3>
              <p>Processus de réservation rapide en quelques clics</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 