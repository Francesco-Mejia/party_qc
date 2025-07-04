# Configuration Firebase pour Party QC

## Étape 1: Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Donnez un nom à votre projet (ex: "party-qc")
4. Suivez les étapes de configuration

## Étape 2: Activer les services Firebase

### Firestore Database
1. Dans la console Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Mode test" pour commencer
4. Sélectionnez une région (ex: "us-central1")

### Authentication
1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Dans l'onglet "Sign-in method", activez "Email/Password"
4. Cliquez sur "Activer" et "Enregistrer"

### Storage (optionnel)
1. Dans la console Firebase, allez dans "Storage"
2. Cliquez sur "Commencer"
3. Choisissez une région
4. Acceptez les règles par défaut

## Étape 3: Obtenir les clés de configuration

1. Dans la console Firebase, cliquez sur l'icône ⚙️ (Paramètres)
2. Sélectionnez "Paramètres du projet"
3. Dans l'onglet "Général", faites défiler jusqu'à "Vos applications"
4. Cliquez sur l'icône Web (</>) pour ajouter une application web
5. Donnez un nom à votre application (ex: "party-qc-web")
6. Copiez la configuration Firebase

## Étape 4: Configurer l'application

1. Ouvrez le fichier `src/firebase/config.ts`
2. Remplacez la configuration par défaut par vos vraies clés :

```typescript
const firebaseConfig = {
  apiKey: "votre-vraie-api-key",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-vrai-project-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "votre-vrai-sender-id",
  appId: "votre-vrai-app-id"
};
```

## Étape 5: Configurer les règles Firestore

Dans la console Firebase, allez dans "Firestore Database" > "Règles" et remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règles pour les événements (lecture publique, écriture admin)
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Règles pour les réservations (lecture/écriture pour utilisateurs authentifiés)
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.admin == true);
    }
    
    // Règles pour les utilisateurs (lecture/écriture pour l'utilisateur lui-même)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Étape 6: Configurer les règles Storage (si utilisé)

Dans la console Firebase, allez dans "Storage" > "Règles" et remplacez par :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Étape 7: Tester l'application

1. Lancez l'application : `npm start`
2. Testez l'inscription/connexion
3. Vérifiez que les événements se chargent
4. Testez la création d'une réservation

## Structure de la base de données

### Collection `events`
```javascript
{
  id: "auto-generated",
  title: "Nom de l'événement",
  description: "Description détaillée",
  date: "2024-02-15",
  time: "22:00",
  location: "Adresse complète",
  price: 45,
  capacity: 200,
  imageUrl: "URL de l'image",
  category: "Électro",
  organizer: "Nom de l'organisateur",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection `bookings`
```javascript
{
  id: "auto-generated",
  eventId: "ID de l'événement",
  userId: "ID de l'utilisateur",
  numberOfTickets: 2,
  totalAmount: 90,
  status: "pending|confirmed|cancelled",
  paymentStatus: "pending|paid|failed",
  paymentIntentId: "Stripe payment intent ID",
  customerName: "Nom du client",
  customerEmail: "email@example.com",
  customerPhone: "+1234567890",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection `users`
```javascript
{
  id: "Firebase Auth UID",
  email: "user@example.com",
  displayName: "Nom complet",
  phone: "+1234567890",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Dépannage

### Erreur "Firebase App named '[DEFAULT]' already exists"
- Vérifiez que vous n'importez pas Firebase plusieurs fois
- Assurez-vous que la configuration est correcte

### Erreur "Missing or insufficient permissions"
- Vérifiez les règles Firestore
- Assurez-vous que l'utilisateur est authentifié si nécessaire

### Erreur "Network request failed"
- Vérifiez votre connexion internet
- Assurez-vous que les règles Firestore permettent l'accès

## Sécurité

⚠️ **Important** : Ne partagez jamais vos clés Firebase publiquement. Les clés API sont sécurisées pour une utilisation côté client, mais gardez-les privées.

Pour la production, considérez :
- Utiliser des variables d'environnement
- Configurer des domaines autorisés dans Firebase
- Mettre en place des règles de sécurité plus strictes 