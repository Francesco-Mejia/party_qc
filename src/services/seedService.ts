import { eventService } from './eventService';
import { Event } from '../types';

const sampleEvents: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        title: "Soirée Électro Montréal",
        description: "Une soirée électro exceptionnelle avec les meilleurs DJs de Montréal. Ambiance garantie avec des lumières laser et une sono de qualité professionnelle.",
        date: "2024-02-15",
        time: "22:00",
        location: "Club Électro, 1234 Rue Sainte-Catherine, Montréal",
        price: 45,
        capacity: 200,
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        category: "Électro",
        organizer: "Club Électro Montréal"
    },
    {
        title: "CONTINENT À QUÉBEC (SOIRÉE AFRICAINE)",
        description: "Une soirée africaine authentique avec musique traditionnelle et moderne, danse africaine, et cuisine du continent. Ambiance festive et culturelle garantie.",
        date: "2024-04-20",
        time: "20:00",
        location: "Centre communautaire de Québec, 123 Avenue des Événements, Québec",
        price: 40,
        capacity: 180,
        imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
        category: "Africain",
        organizer: "Continental Events Québec"
    }
];

export const seedService = {
    // Initialiser la base de données avec des événements d'exemple
    async seedEvents(): Promise<void> {
        try {
            console.log('Initialisation de la base de données avec des événements d\'exemple...');

            for (const eventData of sampleEvents) {
                await eventService.createEvent(eventData);
            }

            console.log('Base de données initialisée avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de la base de données:', error);
            throw error;
        }
    },

    // Vérifier si la base de données est vide
    async isDatabaseEmpty(): Promise<boolean> {
        try {
            const events = await eventService.getAllEvents();
            return events.length === 0;
        } catch (error) {
            console.error('Erreur lors de la vérification de la base de données:', error);
            return true; // En cas d'erreur, on considère qu'elle est vide
        }
    },

    // Initialiser la base de données si elle est vide
    async initializeIfEmpty(): Promise<void> {
        const isEmpty = await this.isDatabaseEmpty();
        if (isEmpty) {
            await this.seedEvents();
        }
    }
}; 