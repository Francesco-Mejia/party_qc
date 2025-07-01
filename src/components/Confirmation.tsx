import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Confirmation.css';

interface BookingData {
  id: string;
  eventId: number;
  eventTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  totalPrice: number;
  bookingDate: string;
}

const Confirmation: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les données de réservation depuis localStorage
    const storedBooking = localStorage.getItem('currentBooking');
    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement de la confirmation...</p>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="error">
        <h2>Réservation non trouvée</h2>
        <Link to="/" className="back-button">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="confirmation">
      <div className="container">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Réservation confirmée !</h1>
          <p>Merci pour votre réservation. Un email de confirmation vous a été envoyé.</p>
        </div>

        <div className="confirmation-content">
          <div className="booking-details">
            <h2>Détails de votre réservation</h2>
            
            <div className="details-grid">
              <div className="detail-card">
                <div className="detail-header">
                  <span className="icon">🎫</span>
                  <h3>Numéro de réservation</h3>
                </div>
                <p className="booking-id">{bookingData.id}</p>
              </div>

              <div className="detail-card">
                <div className="detail-header">
                  <span className="icon">🎉</span>
                  <h3>Événement</h3>
                </div>
                <p>{bookingData.eventTitle}</p>
              </div>

              <div className="detail-card">
                <div className="detail-header">
                  <span className="icon">👤</span>
                  <h3>Nom</h3>
                </div>
                <p>{bookingData.firstName} {bookingData.lastName}</p>
              </div>

              <div className="detail-card">
                <div className="detail-header">
                  <span className="icon">📧</span>
                  <h3>Email</h3>
                </div>
                <p>{bookingData.email}</p>
              </div>

              <div className="detail-card">
                <div className="detail-header">
                  <span className="icon">📱</span>
                  <h3>Téléphone</h3>
                </div>
                <p>{bookingData.phone}</p>
              </div>

              <div className="detail-card">
                <div className="detail-header">
                  <span className="icon">🎫</span>
                  <h3>Nombre de billets</h3>
                </div>
                <p>{bookingData.numberOfTickets} billet{bookingData.numberOfTickets > 1 ? 's' : ''}</p>
              </div>

              <div className="detail-card">
                <div className="detail-header">
                  <span className="icon">💰</span>
                  <h3>Montant payé</h3>
                </div>
                <p className="total-price">${bookingData.totalPrice}</p>
              </div>

              <div className="detail-card">
                <div className="detail-header">
                  <span className="icon">📅</span>
                  <h3>Date de réservation</h3>
                </div>
                <p>{formatDate(bookingData.bookingDate)}</p>
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h2>Prochaines étapes</h2>
            <div className="steps-list">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Vérifiez votre email</h4>
                  <p>Vous avez reçu un email de confirmation avec votre billet électronique</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Préparez-vous pour l'événement</h4>
                  <p>Arrivez 15 minutes avant le début de l'événement avec votre billet</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Amusez-vous !</h4>
                  <p>Profitez de votre soirée et n'oubliez pas de partager vos photos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="important-info">
            <h3>Informations importantes</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="icon">📧</span>
                <div>
                  <h4>Billet électronique</h4>
                  <p>Votre billet a été envoyé par email. Présentez-le à l'entrée.</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="icon">🔄</span>
                <div>
                  <h4>Politique d'annulation</h4>
                  <p>Annulation gratuite jusqu'à 24h avant l'événement.</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="icon">📞</span>
                <div>
                  <h4>Support client</h4>
                  <p>Besoin d'aide ? Contactez-nous au 1-800-PARTY-QC</p>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/" className="home-button">
              Retour à l'accueil
            </Link>
            <button 
              onClick={() => window.print()} 
              className="print-button"
            >
              Imprimer la confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 