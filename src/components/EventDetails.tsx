import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EventDetails.css';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  description: string;
  capacity: number;
  availableTickets: number;
  category: string;
  organizer: string;
  includes: string[];
}

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données d'événement
    const fetchEvent = () => {
      const events: Event[] = [
        {
          id: 3,
          title: "CONTINENT À QUÉBEC (SOIRÉE AFRICAINE)",
          description: "Une soirée africaine authentique avec musique traditionnelle et moderne, danse africaine. Ambiance festive et culturelle garantie.",
          date: "09 août 2025",
          time: "21:00 - 03:00",
          location: "Centre communautaire de Québec, 123 Avenue des Événements, Québec",
          price: 20,
          capacity: 180,
          image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
          category: "Africain",
          organizer: "Groupe NETSTAT",
          includes: ["Entrée générale", "Accès au bar", "Zone de danse"],
          availableTickets: 180
      }
      ];

      const foundEvent = events.find(e => e.id === parseInt(id || '1'));
      setEvent(foundEvent || events[0]);
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement de l'événement...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="error">
        <h2>Événement non trouvé</h2>
        <Link to="/" className="back-button">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="event-details">
      <div className="event-hero">
        <div className="event-image">
          <img src={event.image} alt={event.title} />
          <div className="event-overlay">
            <div className="event-info">
              <h1>{event.title}</h1>
              <div className="event-meta">
                <span className="category">{event.category}</span>
                <span className="price">${event.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-content">
        <div className="container">
          <div className="event-grid">
            <div className="event-main">
              <div className="event-description">
                <h2>À propos de cet événement</h2>
                <p>{event.description}</p>
              </div>

              <div className="event-includes">
                <h3>Ce qui est inclus</h3>
                <ul>
                  {event.includes.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>
              </div>

              <div className="event-organizer">
                <h3>Organisateur</h3>
                <p>{event.organizer}</p>
              </div>
            </div>

            <div className="event-sidebar">
              <div className="booking-card">
                <div className="booking-header">
                  <h3>Réserver vos places</h3>
                  <div className="ticket-info">
                    <span className="price">${event.price}</span>
                    <span className="per-ticket">par billet</span>
                  </div>
                </div>

                <div className="event-details-summary">
                  <div className="detail-item">
                    <span className="icon">📅</span>
                    <div>
                      <strong>Date</strong>
                      <p>{event.date}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="icon">🕒</span>
                    <div>
                      <strong>Heure</strong>
                      <p>{event.time}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="icon">📍</span>
                    <div>
                      <strong>Lieu</strong>
                      <p>{event.location}</p>
                    </div>
                  </div>
                </div>

                {event.availableTickets > 0 ? (
                  <Link to={`/booking/${event.id}`} className="book-now-button">
                    Réserver Maintenant
                  </Link>
                ) : (
                  <button className="sold-out-button" disabled>
                    Complet
                  </button>
                )}

                <div className="booking-note">
                  <p>💳 Paiement sécurisé par Stripe</p>
                  <p>📧 Billet envoyé par email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 