const correctEmail = 'johndoe@gmail.com';
const correctPassword = '123456John';

// Contrôleur pour afficher la page de connexion
exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

// Contrôleur pour gérer l'authentification
exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  // Vérification des identifiants
  if (email === correctEmail && password === correctPassword) {
    return res.redirect('/home'); // Rediriger vers la page d'accueil en cas de succès
  } else {
    res.render('login', {
      title: 'Login',
      errorMessage: 'Identifiants incorrects. Veuillez réessayer.',
    });
  }
};