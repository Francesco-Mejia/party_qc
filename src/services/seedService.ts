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
        title: "Festival Jazz Québec",
        description: "Le plus grand festival de jazz du Québec avec des artistes internationaux. 3 jours de musique exceptionnelle dans le cœur historique de Québec.",
        date: "2024-03-20",
        time: "19:00",
        location: "Place d'Youville, Vieux-Québec",
        price: 85,
        capacity: 500,
        imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
        category: "Jazz",
        organizer: "Festival Jazz Québec"
    },
    {
        title: "Comédie Stand-up Gatineau",
        description: "Soirée de rires avec les meilleurs humoristes de la région. Ambiance décontractée et humour québécois au rendez-vous.",
        date: "2024-02-28",
        time: "20:30",
        location: "Théâtre de l'Île, 361 Boulevard de la Cité, Gatineau",
        price: 35,
        capacity: 150,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        category: "Comédie",
        organizer: "Comédie Gatineau"
    },
    {
        title: "Concert Rock Sherbrooke",
        description: "Concert rock énergique avec des groupes locaux et internationaux. Une soirée inoubliable pour tous les amateurs de rock.",
        date: "2024-03-10",
        time: "21:00",
        location: "Centre culturel de Sherbrooke, 250 Rue du Palais",
        price: 55,
        capacity: 300,
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        category: "Rock",
        organizer: "Rock Sherbrooke Productions"
    },
    {
        title: "Soirée Latino Laval",
        description: "Une soirée latino authentique avec salsa, bachata et merengue. Cours de danse inclus et ambiance festive garantie.",
        date: "2024-02-22",
        time: "20:00",
        location: "Centre communautaire de Laval, 456 Avenue des Bois",
        price: 30,
        capacity: 120,
        imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
        category: "Latino",
        organizer: "Latino Laval"
    },
    {
        title: "Théâtre Classique Trois-Rivières",
        description: "Représentation de 'Roméo et Juliette' par la troupe de théâtre classique. Une interprétation moderne et touchante.",
        date: "2024-03-05",
        time: "19:30",
        location: "Théâtre du Cégep, 3500 Boulevard des Forges, Trois-Rivières",
        price: 40,
        capacity: 200,
        imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800",
        category: "Théâtre",
        organizer: "Théâtre Classique TR"
    },
    {
        title: "Festival Country Saguenay",
        description: "Le plus grand festival country du Saguenay avec des artistes québécois et américains. 2 jours de musique country authentique.",
        date: "2024-04-12",
        time: "18:00",
        location: "Parc de la Rivière-du-Moulin, Saguenay",
        price: 75,
        capacity: 400,
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        category: "Country",
        organizer: "Festival Country Saguenay"
    },
    {
        title: "Soirée Reggae Drummondville",
        description: "Soirée reggae avec des artistes locaux et internationaux. Ambiance détendue et musique qui fait bouger.",
        date: "2024-03-15",
        time: "21:30",
        location: "Bar Le Reggae, 789 Rue Principale, Drummondville",
        price: 25,
        capacity: 100,
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        category: "Reggae",
        organizer: "Reggae Drummondville"
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