import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { init, send } from '@emailjs/browser';
import './PaymentForm.css';

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

const PaymentForm: React.FC = () => {
  const { eventId, bookingId } = useParams<{ eventId: string; bookingId: string }>();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Récupérer les données de réservation depuis localStorage
    const storedBooking = localStorage.getItem('currentBooking');
    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking));
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Initialiser EmailJS (remplacez par vos propres clés)
  useEffect(() => {
    init('YOUR_EMAILJS_USER_ID');
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !bookingData) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simuler le processus de paiement Stripe
      // En production, vous devriez appeler votre backend pour créer un PaymentIntent
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: `${bookingData.firstName} ${bookingData.lastName}`,
          email: bookingData.email,
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Erreur lors du paiement');
        setLoading(false);
        return;
      }

      // Simuler un paiement réussi
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Envoyer l'email de confirmation
      await sendEmailConfirmation(bookingData);

      // Marquer comme succès
      setSuccess(true);
      setLoading(false);

      // Rediriger vers la page de confirmation après 3 secondes
      setTimeout(() => {
        navigate(`/confirmation/${bookingData.id}`);
      }, 3000);

    } catch (err) {
      setError('Une erreur est survenue lors du traitement du paiement');
      setLoading(false);
    }
  };

  const sendEmailConfirmation = async (booking: BookingData) => {
    try {
      // Template pour EmailJS (remplacez par vos propres IDs)
      const templateParams = {
        to_email: booking.email,
        to_name: `${booking.firstName} ${booking.lastName}`,
        event_title: booking.eventTitle,
        booking_id: booking.id,
        number_of_tickets: booking.numberOfTickets,
        total_price: booking.totalPrice,
        booking_date: new Date(booking.bookingDate).toLocaleDateString('fr-CA'),
      };

      // Envoyer l'email de confirmation
      await send(
        'YOUR_EMAILJS_SERVICE_ID',
        'YOUR_EMAILJS_TEMPLATE_ID',
        templateParams,
        'YOUR_EMAILJS_PUBLIC_KEY'
      );

      console.log('Email de confirmation envoyé avec succès');
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      // Ne pas bloquer le processus si l'email échoue
    }
  };

  if (!bookingData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement des données de réservation...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="payment-success">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h2>Paiement réussi !</h2>
          <p>Votre réservation a été confirmée et un email vous a été envoyé.</p>
          <p>Redirection vers la page de confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-form">
      <div className="container">
        <div className="payment-header">
          <h1>Paiement sécurisé</h1>
          <p>Finalisez votre réservation en toute sécurité</p>
        </div>

        <div className="payment-content">
          <div className="booking-summary">
            <h3>Récapitulatif de votre réservation</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span>Événement:</span>
                <span>{bookingData.eventTitle}</span>
              </div>
              <div className="summary-item">
                <span>Nom:</span>
                <span>{bookingData.firstName} {bookingData.lastName}</span>
              </div>
              <div className="summary-item">
                <span>Email:</span>
                <span>{bookingData.email}</span>
              </div>
              <div className="summary-item">
                <span>Nombre de billets:</span>
                <span>{bookingData.numberOfTickets}</span>
              </div>
              <div className="summary-item total">
                <span>Total à payer:</span>
                <span>${bookingData.totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h3>Informations de paiement</h3>
            <form onSubmit={handleSubmit}>
              <div className="card-element-container">
                <label>Numéro de carte</label>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>

              {error && (
                <div className="error-message">
                  <p>{error}</p>
                </div>
              )}

              <div className="payment-actions">
                <button
                  type="button"
                  onClick={() => navigate(`/booking/${eventId}`)}
                  className="cancel-button"
                  disabled={loading}
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="pay-button"
                  disabled={!stripe || loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner-small"></div>
                      Traitement...
                    </>
                  ) : (
                    `Payer $${bookingData.totalPrice}`
                  )}
                </button>
              </div>
            </form>

            <div className="payment-security">
              <div className="security-info">
                <div className="security-icon">🔒</div>
                <div>
                  <h4>Paiement sécurisé</h4>
                  <p>Vos informations de paiement sont protégées par le cryptage SSL et Stripe</p>
                </div>
              </div>
              <div className="payment-methods">
                <span>Méthodes acceptées:</span>
                <div className="method-icons">
                  <span>💳</span>
                  <span>🏦</span>
                  <span>📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm; 