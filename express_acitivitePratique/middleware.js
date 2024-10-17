module.exports = (req, res, next) => {
    const currentDate = new Date();
    const day = currentDate.getDay(); // 0 = Dimanche, 6 = Samedi
    const hour = currentDate.getHours();

    // Heures de travail : du Lundi au Vendredi, de 9h à 17h
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continuer si on est dans les heures de travail
    } else {
        // Redirection vers une page "hors horaires"
        res.status(403).render('closed', { title: 'Hors horaires' });
    }
};