import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Booking } from '../types';

const BOOKINGS_COLLECTION = 'bookings';

export const bookingService = {
    // Créer une nouvelle réservation
    async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        try {
            const now = Timestamp.now();
            const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
                ...bookingData,
                createdAt: now,
                updatedAt: now
            });
            return docRef.id;
        } catch (error) {
            console.error('Erreur lors de la création de la réservation:', error);
            throw error;
        }
    },

    // Récupérer une réservation par ID
    async getBookingById(id: string): Promise<Booking | null> {
        try {
            const docRef = doc(db, BOOKINGS_COLLECTION, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    ...data,
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate()
                } as Booking;
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération de la réservation:', error);
            throw error;
        }
    },

    // Mettre à jour une réservation
    async updateBooking(id: string, bookingData: Partial<Booking>): Promise<void> {
        try {
            const docRef = doc(db, BOOKINGS_COLLECTION, id);
            await updateDoc(docRef, {
                ...bookingData,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la réservation:', error);
            throw error;
        }
    },

    // Supprimer une réservation
    async deleteBooking(id: string): Promise<void> {
        try {
            const docRef = doc(db, BOOKINGS_COLLECTION, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation:', error);
            throw error;
        }
    },

    // Récupérer les réservations d'un utilisateur
    async getBookingsByUserId(userId: string): Promise<Booking[]> {
        try {
            const q = query(
                collection(db, BOOKINGS_COLLECTION),
                where('userId', '==', userId),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
                updatedAt: doc.data().updatedAt?.toDate()
            })) as Booking[];
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations utilisateur:', error);
            throw error;
        }
    },

    // Récupérer les réservations d'un événement
    async getBookingsByEventId(eventId: string): Promise<Booking[]> {
        try {
            const q = query(
                collection(db, BOOKINGS_COLLECTION),
                where('eventId', '==', eventId),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
                updatedAt: doc.data().updatedAt?.toDate()
            })) as Booking[];
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations événement:', error);
            throw error;
        }
    },

    // Mettre à jour le statut de paiement
    async updatePaymentStatus(bookingId: string, paymentStatus: Booking['paymentStatus'], paymentIntentId?: string): Promise<void> {
        try {
            const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
            const updateData: any = {
                paymentStatus,
                updatedAt: Timestamp.now()
            };

            if (paymentIntentId) {
                updateData.paymentIntentId = paymentIntentId;
            }

            await updateDoc(docRef, updateData);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de paiement:', error);
            throw error;
        }
    },

    // Mettre à jour le statut de la réservation
    async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
        try {
            const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
            await updateDoc(docRef, {
                status,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de réservation:', error);
            throw error;
        }
    },

    // Récupérer toutes les réservations (pour l'admin)
    async getAllBookings(): Promise<Booking[]> {
        try {
            const q = query(
                collection(db, BOOKINGS_COLLECTION),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
                updatedAt: doc.data().updatedAt?.toDate()
            })) as Booking[];
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les réservations:', error);
            throw error;
        }
    }
}; 