const express = require('express');
const path = require('path');
const app = express();
const checkWorkingHours = require('./middleware');

// Configuration du moteur de templates
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour vérifier les heures de travail
app.use(checkWorkingHours);

// Routes pour les différentes pages
app.get('/', (req, res) => {
    res.render('home', { title: 'Accueil' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Nos Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contactez-nous' });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page non trouvée' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});