import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingForm.css';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  availableTickets: number;
}

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  musicalPreferences: string;
}

interface BookingFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  numberOfTickets?: string;
  musicalPreferences?: string;
}

const BookingForm: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    numberOfTickets: 1,
    musicalPreferences: ''
  });
  const [errors, setErrors] = useState<BookingFormErrors>({});

  useEffect(() => {
    // Simuler le chargement des données d'événement
    const fetchEvent = () => {
      const events: Event[] = [
        {
          id: 1,
          title: "Soirée Électro Montréal",
          date: "15 Décembre 2024",
          time: "22:00 - 04:00",
          location: "Club Électro, Montréal",
          price: 5,
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
          availableTickets: 127
        },
        {
          id: 2,
          title: "Party Latino Québec",
          date: "20 Décembre 2024",
          time: "20:00 - 02:00",
          location: "Salsa Club, Québec",
          price: 35,
          image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
          availableTickets: 89
        }
      ];

      const foundEvent = events.find(e => e.id === parseInt(eventId || '1'));
      setEvent(foundEvent || events[0]);
      setLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  const validateForm = (): boolean => {
    const newErrors: BookingFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom de famille est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (formData.numberOfTickets < 1) {
      newErrors.numberOfTickets = 'Au moins 1 billet est requis';
    } else if (event && formData.numberOfTickets > event.availableTickets) {
      newErrors.numberOfTickets = `Maximum ${event.availableTickets} billets disponibles`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfTickets' ? parseInt(value) : value
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name as keyof BookingFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && event) {
      // Générer un ID de réservation unique
      const bookingId = `BK${Date.now()}`;
      
      // Sauvegarder les données de réservation (simulation)
      const bookingData = {
        id: bookingId,
        eventId: event.id,
        eventTitle: event.title,
        ...formData,
        totalPrice: formData.numberOfTickets * event.price,
        bookingDate: new Date().toISOString()
      };
      
      // Stocker temporairement dans localStorage
      localStorage.setItem('currentBooking', JSON.stringify(bookingData));
      
      // Rediriger vers la page de paiement
      navigate(`/payment/${event.id}/${bookingId}`);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="error">
        <h2>Événement non trouvé</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const totalPrice = formData.numberOfTickets * event.price;

  return (
    <div className="booking-form">
      <div className="container">
        <div className="booking-header">
          <h1>Réserver vos places</h1>
          <p>Complétez le formulaire ci-dessous pour réserver vos billets</p>
        </div>

        <div className="booking-content">
          <div className="event-summary">
            <div className="event-card">
              <img src={event.image} alt={event.title} />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p><strong>📅 Date:</strong> {event.date}</p>
                <p><strong>🕒 Heure:</strong> {event.time}</p>
                <p><strong>📍 Lieu:</strong> {event.location}</p>
                <p><strong>💰 Prix:</strong> ${event.price} par billet</p>
                <p><strong>🎫 Disponible:</strong> {event.availableTickets} places</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-section">
              <h3>Informations personnelles</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Nom de famille *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Détails de la réservation</h3>
              
              <div className="form-group">
                <label htmlFor="numberOfTickets">Nombre de billets *</label>
                <select
                  id="numberOfTickets"
                  name="numberOfTickets"
                  value={formData.numberOfTickets}
                  onChange={handleInputChange}
                  className={errors.numberOfTickets ? 'error' : ''}
                >
                  {Array.from({ length: Math.min(10, event.availableTickets) }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num} billet{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
                {errors.numberOfTickets && <span className="error-message">{errors.numberOfTickets}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="musicalPreferences">🎵 Choix musicaux (optionnel)</label>
                <textarea
                  id="musicalPreferences"
                  name="musicalPreferences"
                  value={formData.musicalPreferences}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Ex: Reggaeton, House, Hip-Hop, Chansons préférées, Artistes favoris, etc. Nous ferons de notre mieux pour inclure vos préférences !"
                />
                <small className="help-text">Partagez vos genres musicaux préférés ou chansons que vous aimeriez entendre lors de l'événement</small>
              </div>
            </div>

            <div className="price-summary">
              <h3>Récapitulatif</h3>
              <div className="price-details">
                <div className="price-row">
                  <span>{formData.numberOfTickets} billet{formData.numberOfTickets > 1 ? 's' : ''} × ${event.price}</span>
                  <span>${formData.numberOfTickets * event.price}</span>
                </div>
                <div className="price-row total">
                  <strong>Total</strong>
                  <strong>${totalPrice}</strong>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate(`/event/${event.id}`)} className="cancel-button">
                Annuler
              </button>
              <button type="submit" className="submit-button">
                Continuer vers le paiement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm; 