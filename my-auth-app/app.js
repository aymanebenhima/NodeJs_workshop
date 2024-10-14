const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');

// Configuration du moteur de template Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware pour traiter les données POST du formulaire
app.use(bodyParser.urlencoded({ extended: false }));

// Servir les fichiers statiques (comme le CSS)
app.use(express.static('public'));

// Routes
app.use('/', authRoutes);
app.use('/', pageRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est démarré sur http://localhost:${PORT}`);
});