import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Soirée Électro Montréal",
      date: "15 Décembre 2024",
      time: "22:00 - 04:00",
      location: "Club Électro, Montréal",
      price: 45,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      description: "Une nuit inoubliable avec les meilleurs DJs de la scène électro montréalaise."
    },
    {
      id: 2,
      title: "Party Latino Québec",
      date: "20 Décembre 2024",
      time: "20:00 - 02:00",
      location: "Salsa Club, Québec",
      price: 35,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
      description: "Rythmes latinos, cocktails exotiques et ambiance festive garantie."
    }
  ];

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
            {featuredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-price">${event.price}</div>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <p><strong>📅 Date:</strong> {event.date}</p>
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