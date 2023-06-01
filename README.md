# NextJs-e-commerce

Le projet NextJs-e-commerce est un site e-commerce développé avec Next.js, offrant une expérience de magasinage en ligne conviviale et sécurisée.
Le site comprend une partie admin pour la gestion des produits, des commandes et des utilisateurs, ainsi qu'une partie client pour les utilisateurs qui souhaitent explorer et acheter des produits.

## Fonctionnalités

### Partie Client

- Parcours de produits : Les utilisateurs peuvent naviguer facilement à travers les différentes catégories de produits, afficher les détails des produits individuels et ajouter des articles à leur panier.
- Panier d'achat : Les utilisateurs peuvent gérer leur panier en ajoutant, supprimant ou modifiant les quantités des articles sélectionnés. Ils peuvent également passer à la caisse pour finaliser leur commande.
- Authentification avec Google : Les utilisateurs peuvent s'inscrire et se connecter en utilisant leur compte Google, ce qui offre une expérience d'authentification rapide et sécurisée.
- Historique des commandes : Les utilisateurs peuvent consulter l'historique de leurs commandes passées et suivre l'état de livraison de chaque commande.

### Partie Admin

- Gestion des produits : Les administrateurs peuvent ajouter de nouveaux produits, mettre à jour les informations des produits existants et supprimer des produits.
- Gestion des commandes : Les administrateurs peuvent afficher toutes les commandes passées, les marquer comme traitées et gérer l'état de livraison.
- Gestion des utilisateurs : Les administrateurs ont la possibilité de gérer les utilisateurs en affichant leurs informations, en les désactivant ou en les supprimant si nécessaire.

## Technologies utilisées

- Next.js : Un framework React pour le rendu côté serveur, offrant des performances élevées et des fonctionnalités avancées.
- Tailwind CSS : Un framework CSS utilitaire qui facilite la création d'interfaces attrayantes et réactives.
- MongoDB : Une base de données NoSQL flexible et évolutive, utilisée pour stocker les informations sur les produits, les commandes et les utilisateurs.
- NextAuth.js : Une bibliothèque d'authentification pour Next.js qui facilite l'intégration de différentes stratégies d'authentification, y compris l'authentification Google pour une connexion rapide et sécurisée.

## Structure du projet

Le projet suit une structure organisée pour faciliter le développement et la maintenance. Les pages Next.js sont placées dans le répertoire `pages/`, les composants réutilisables dans `components/`, les styles dans `styles/`, les fichiers statiques dans `public/`, les modèles de données MongoDB dans `models/`, et les fonctions utilitaires et configurations dans `lib/`.


## Start Application

### Accédez au répertoire du projet.
cd votre-projet

### Installez les dépendances du projet.
```shell
npm install 

(j'utilise pnpm pour ma part)

### Configurez les variables d'environnement
Créez un fichier .env.local à la racine du projet et ajoutez les variables suivantes :

#### MongoDB
MONGODB_URI

### #GOOGLE AUTH
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

#### AWS S3
S3_ACCESS_KEY
S3_SECRET_ACCESS_KEY
BUCKETNAME

#### EMAIL ADMIN
EMAIL_ADMIN

### Lancez l'application.
```shell
npm run dev

L'application sera accessible à l'adresse http://localhost:3000.

## Auteur

Ce projet est développé et maintenu par Vicktor Juhel.

```shell
git clone https://github.com/votre-utilisateur/votre-projet.git
