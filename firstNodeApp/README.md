# Créer un serveur Node.js avec des routes natives

## Description

Ce tutoriel vous montre comment créer un serveur simple avec Node.js qui peut gérer plusieurs routes comme `/`, `/about`, et `/contact`, sans avoir besoin de frameworks comme Express.

## Prérequis

- [Node.js](https://nodejs.org/en/download/) installé sur votre machine.
- Un éditeur de texte comme [Visual Studio Code](https://code.visualstudio.com/).

## Étape 1 : Initialiser un projet Node.js

Tout d'abord, nous allons initialiser un projet Node.js pour gérer les dépendances.

1. Créez un dossier pour votre projet.
2. Ouvrez une ligne de commande ou un terminal dans ce dossier et exécutez la commande suivante :

   ```bash
   npm init -y
   ```

   Cela créera un fichier `package.json` avec la configuration par défaut.

## Étape 2 : Créer le serveur

Créez un fichier nommé `server.js` et copiez-y le code suivant :

```javascript
// Étape 1 : Importer le module 'http' intégré à Node.js
const http = require('http');

// Étape 2 : Définir l'adresse IP et le port sur lesquels le serveur va écouter
const hostname = '127.0.0.1';  // Adresse localhost
const port = 3000;  // Port 3000

// Étape 3 : Créer le serveur
const server = http.createServer((req, res) => {
  // Configurer les en-têtes de la réponse
  res.statusCode = 200;  // Indique que la requête a réussi
  res.setHeader('Content-Type', 'text/html');  // Le contenu est de type HTML

  // Récupérer l'URL de la requête
  const url = req.url;

  // Vérifier les différentes routes
  if (url === '/') {
    res.end('<h1>Bienvenue sur mon premier serveur Node.js !</h1><p>Ceci est une réponse à une requête HTTP.</p>');
  } else if (url === '/about') {
    res.end('<h1>À propos de nous</h1><p>Ceci est la page À propos.</p>');
  } else if (url === '/contact') {
    res.end('<h1>Contactez-nous</h1><p>Ceci est la page de contact.</p>');
  } else {
    // Pour toutes les autres routes non définies
    res.statusCode = 404;
    res.end('<h1>404 - Page non trouvée</h1><p>La page que vous cherchez n\'existe pas.</p>');
  }
});

// Étape 4 : Lancer le serveur
server.listen(port, hostname, () => {
  console.log(`Le serveur est en cours d'exécution à l'adresse http://${hostname}:${port}/`);
});
```

## Étape 3 : Exécuter le serveur

Pour exécuter le serveur, ouvrez votre terminal dans le dossier de votre projet et exécutez la commande suivante :

```bash
node server.js
```

Vous verrez un message dans le terminal indiquant que le serveur est en cours d'exécution :

```bash
Le serveur est en cours d'exécution à l'adresse http://127.0.0.1:3000/
```

## Étape 4 : Tester les routes

Ouvrez votre navigateur et essayez les différentes routes :

1. Accédez à [http://127.0.0.1:3000/](http://127.0.0.1:3000/) pour afficher la page d'accueil.
2. Accédez à [http://127.0.0.1:3000/about](http://127.0.0.1:3000/about) pour la page À propos.
3. Accédez à [http://127.0.0.1:3000/contact](http://127.0.0.1:3000/contact) pour la page de contact.
4. Essayez d'accéder à une route inexistante, par exemple [http://127.0.0.1:3000/undefined](http://127.0.0.1:3000/undefined) pour tester la page 404.

## Étape 5 : Arrêter le serveur

Pour arrêter le serveur, appuyez sur `CTRL + C` dans le terminal.
