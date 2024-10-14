// Contrôleur pour la page d'accueil
exports.getHome = (req, res) => {
    res.render('home', { title: 'Accueil' });
  };
  
  // Contrôleur pour la page "À propos de nous"
  exports.getAbout = (req, res) => {
    res.render('about', { title: 'À propos de nous' });
  };  