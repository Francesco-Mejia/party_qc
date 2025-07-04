export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    price: number;
    capacity: number;
    imageUrl: string;
    category: string;
    organizer: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Booking {
    id: string;
    eventId: string;
    userId: string;
    numberOfTickets: number;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed';
    paymentIntentId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    email: string;
    displayName: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentIntent {
    id: string;
    amount: number;
    currency: string;
    status: string;
    clientSecret: string;
} 