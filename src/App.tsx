import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';

// Composants
import Header from './components/Header';
import Home from './components/Home';
import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';
import PaymentForm from './components/PaymentForm';
import Confirmation from './components/Confirmation';

// Configuration Stripe (remplacez par votre clé publique)
const stripePromise = loadStripe('pk_test_your_stripe_public_key_here');

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/booking/:eventId" element={<BookingForm />} />
            <Route 
              path="/payment/:eventId/:bookingId" 
              element={
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              } 
            />
            <Route path="/confirmation/:bookingId" element={<Confirmation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
