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
