# 🎉 Party QC - Système de Réservation d'Événements

Un site web moderne pour la réservation d'événements avec paiement sécurisé et envoi automatique d'emails de confirmation.

## ✨ Fonctionnalités

- 🎫 **Réservation en ligne** - Interface intuitive pour réserver des billets
- 💳 **Paiement sécurisé** - Intégration Stripe (carte de crédit, débit, Apple Pay)
- 📧 **Emails automatiques** - Confirmation et facture envoyées par EmailJS
- 📱 **Design responsive** - Optimisé pour mobile et desktop
- 🎨 **Interface moderne** - Design attractif avec animations fluides
- 🔒 **Sécurité** - Paiements sécurisés et données protégées

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd party_qc
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
Créez un fichier `.env` à la racine du projet :
```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_stripe
REACT_APP_EMAILJS_USER_ID=votre_user_id_emailjs
REACT_APP_EMAILJS_SERVICE_ID=votre_service_id_emailjs
REACT_APP_EMAILJS_TEMPLATE_ID=votre_template_id_emailjs
REACT_APP_EMAILJS_PUBLIC_KEY=votre_public_key_emailjs
```

4. **Démarrer l'application**
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## ⚙️ Configuration

### Stripe (Paiements)

1. Créez un compte sur [Stripe](https://stripe.com)
2. Récupérez votre clé publique dans le dashboard
3. Remplacez `pk_test_your_stripe_public_key_here` dans `src/App.tsx`

### EmailJS (Emails automatiques)

1. Créez un compte sur [EmailJS](https://www.emailjs.com)
2. Configurez un service email (Gmail, Outlook, etc.)
3. Créez un template d'email avec les variables suivantes :
   - `to_email` - Email du client
   - `to_name` - Nom du client
   - `event_title` - Titre de l'événement
   - `booking_id` - ID de réservation
   - `number_of_tickets` - Nombre de billets
   - `total_price` - Prix total
   - `booking_date` - Date de réservation

4. Remplacez les IDs dans `src/components/PaymentForm.tsx` :
   ```javascript
   init('YOUR_EMAILJS_USER_ID');
   
   await send(
     'YOUR_EMAILJS_SERVICE_ID',
     'YOUR_EMAILJS_TEMPLATE_ID',
     templateParams,
     'YOUR_EMAILJS_PUBLIC_KEY'
   );
   ```

### Base de données (Optionnel)

Pour une version production, vous pouvez ajouter une base de données :

1. **Firebase Firestore** (recommandé)
```bash
npm install firebase
```

2. **Configuration Firebase**
Créez un fichier `src/firebase/config.ts` :
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "votre_api_key",
  authDomain: "votre_auth_domain",
  projectId: "votre_project_id",
  storageBucket: "votre_storage_bucket",
  messagingSenderId: "votre_messaging_sender_id",
  appId: "votre_app_id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── Header.tsx          # Navigation principale
│   ├── Home.tsx           # Page d'accueil
│   ├── EventDetails.tsx   # Détails d'événement
│   ├── BookingForm.tsx    # Formulaire de réservation
│   ├── PaymentForm.tsx    # Formulaire de paiement
│   ├── Confirmation.tsx   # Page de confirmation
│   └── *.css              # Styles des composants
├── App.tsx                # Composant principal
├── App.css               # Styles globaux
└── index.tsx             # Point d'entrée
```

## 🎨 Personnalisation

### Modifier les événements

Les événements sont définis dans les composants `Home.tsx` et `EventDetails.tsx`. Modifiez les tableaux `featuredEvents` et `events` pour ajouter vos propres événements.

### Changer les couleurs

Modifiez les variables CSS dans `src/App.css` :
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #27ae60;
  --danger-color: #ff6b6b;
}
```

### Ajouter des fonctionnalités

- **Système d'authentification** - Ajoutez Firebase Auth
- **Gestion des événements** - Interface admin pour créer/modifier
- **Notifications push** - Rappels d'événements
- **Système de fidélité** - Points et réductions

## 🔧 Scripts Disponibles

```bash
npm start          # Démarrer en mode développement
npm run build      # Construire pour la production
npm test           # Lancer les tests
npm run eject      # Éjecter la configuration (irréversible)
```

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🔒 Sécurité

- Paiements sécurisés via Stripe
- Validation des formulaires côté client
- Protection contre les injections XSS
- HTTPS recommandé en production

## 🚀 Déploiement

### Netlify (Recommandé)

1. Connectez votre repo GitHub à Netlify
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Vercel

1. Installez Vercel CLI
2. `vercel` pour déployer
3. Configurez les variables d'environnement

### Autres plateformes

L'application peut être déployée sur n'importe quelle plateforme supportant React :
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- GitHub Pages

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@partyqc.com
- 📱 Téléphone : 1-800-PARTY-QC
- 💬 Chat : Disponible sur le site

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :
1. Fork le projet
2. Créer une branche feature
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

---

**Développé avec ❤️ pour les événements du Québec**
