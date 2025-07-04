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
    limit,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Event } from '../types';

const EVENTS_COLLECTION = 'events';

export const eventService = {
    // Récupérer tous les événements
    async getAllEvents(): Promise<Event[]> {
        try {
            const q = query(
                collection(db, EVENTS_COLLECTION),
                orderBy('date', 'asc')
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
                updatedAt: doc.data().updatedAt?.toDate()
            })) as Event[];
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
            throw error;
        }
    },

    // Récupérer un événement par ID
    async getEventById(id: string): Promise<Event | null> {
        try {
            const docRef = doc(db, EVENTS_COLLECTION, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    ...data,
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate()
                } as Event;
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'événement:', error);
            throw error;
        }
    },

    // Créer un nouvel événement
    async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        try {
            const now = Timestamp.now();
            const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
                ...eventData,
                createdAt: now,
                updatedAt: now
            });
            return docRef.id;
        } catch (error) {
            console.error('Erreur lors de la création de l\'événement:', error);
            throw error;
        }
    },

    // Mettre à jour un événement
    async updateEvent(id: string, eventData: Partial<Event>): Promise<void> {
        try {
            const docRef = doc(db, EVENTS_COLLECTION, id);
            await updateDoc(docRef, {
                ...eventData,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'événement:', error);
            throw error;
        }
    },

    // Supprimer un événement
    async deleteEvent(id: string): Promise<void> {
        try {
            const docRef = doc(db, EVENTS_COLLECTION, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement:', error);
            throw error;
        }
    },

    // Récupérer les événements par catégorie
    async getEventsByCategory(category: string): Promise<Event[]> {
        try {
            const q = query(
                collection(db, EVENTS_COLLECTION),
                where('category', '==', category),
                orderBy('date', 'asc')
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
                updatedAt: doc.data().updatedAt?.toDate()
            })) as Event[];
        } catch (error) {
            console.error('Erreur lors de la récupération des événements par catégorie:', error);
            throw error;
        }
    },

    // Récupérer les événements à venir
    async getUpcomingEvents(limitCount: number = 10): Promise<Event[]> {
        try {
            const now = new Date();
            const q = query(
                collection(db, EVENTS_COLLECTION),
                where('date', '>=', now.toISOString().split('T')[0]),
                orderBy('date', 'asc'),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
                updatedAt: doc.data().updatedAt?.toDate()
            })) as Event[];
        } catch (error) {
            console.error('Erreur lors de la récupération des événements à venir:', error);
            throw error;
        }
    }
}; 