import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    User as FirebaseUser,
    UserCredential
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    Timestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User } from '../types';

const USERS_COLLECTION = 'users';

export const authService = {
    // Inscription d'un nouvel utilisateur
    async register(email: string, password: string, displayName: string, phone?: string): Promise<UserCredential> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Mettre à jour le profil Firebase
            await updateProfile(user, {
                displayName
            });

            // Créer le document utilisateur dans Firestore
            const now = Timestamp.now();
            const userData: Omit<User, 'id'> = {
                email: user.email!,
                displayName,
                phone,
                createdAt: now.toDate(),
                updatedAt: now.toDate()
            };

            await setDoc(doc(db, USERS_COLLECTION, user.uid), userData);

            return userCredential;
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            throw error;
        }
    },

    // Connexion utilisateur
    async login(email: string, password: string): Promise<UserCredential> {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            throw error;
        }
    },

    // Déconnexion utilisateur
    async logout(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            throw error;
        }
    },

    // Écouter les changements d'état d'authentification
    onAuthStateChanged(callback: (user: FirebaseUser | null) => void): () => void {
        return onAuthStateChanged(auth, callback);
    },

    // Récupérer l'utilisateur actuel
    getCurrentUser(): FirebaseUser | null {
        return auth.currentUser;
    },

    // Récupérer les données utilisateur depuis Firestore
    async getUserData(userId: string): Promise<User | null> {
        try {
            const docRef = doc(db, USERS_COLLECTION, userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    ...data,
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate()
                } as User;
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
            throw error;
        }
    },

    // Mettre à jour les données utilisateur
    async updateUserData(userId: string, userData: Partial<User>): Promise<void> {
        try {
            const docRef = doc(db, USERS_COLLECTION, userId);
            await updateDoc(docRef, {
                ...userData,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données utilisateur:', error);
            throw error;
        }
    },

    // Vérifier si l'utilisateur est connecté
    isAuthenticated(): boolean {
        return auth.currentUser !== null;
    }
}; 