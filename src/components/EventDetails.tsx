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
          id: 1,
          title: "Soirée Électro Montréal",
          date: "15 Décembre 2024",
          time: "22:00 - 04:00",
          location: "Club Électro, 1234 Rue Sainte-Catherine, Montréal, QC",
          price: 5,
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
          description: "Une nuit inoubliable avec les meilleurs DJs de la scène électro montréalaise. Venez danser sur les rythmes les plus en vogue avec une ambiance unique et des performances exceptionnelles. Bar complet avec cocktails signature et zone VIP disponible.",
          capacity: 500,
          availableTickets: 127,
          category: "Électro",
          organizer: "Montréal Nightlife",
          includes: ["Entrée générale", "Coat check", "Accès au bar", "Zone de danse"]
        },
        {
          id: 2,
          title: "Party Latino Québec",
          date: "20 Décembre 2024",
          time: "20:00 - 02:00",
          location: "Salsa Club, 5678 Boulevard Laurier, Québec, QC",
          price: 35,
          image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
          description: "Rythmes latinos, cocktails exotiques et ambiance festive garantie. Cours de salsa gratuit inclus, démonstrations de danse et musique live. Une soirée pour tous les âges avec une atmosphère chaleureuse et accueillante.",
          capacity: 300,
          availableTickets: 89,
          category: "Latino",
          organizer: "Québec Salsa Club",
          includes: ["Entrée générale", "Cours de salsa", "Cocktail de bienvenue", "Démonstrations"]
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
                  <div className="detail-item">
                    <span className="icon">🎫</span>
                    <div>
                      <strong>Places disponibles</strong>
                      <p>{event.availableTickets} sur {event.capacity}</p>
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
                  <p>🔄 Annulation gratuite jusqu'à 24h avant</p>
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