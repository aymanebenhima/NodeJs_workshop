## Checkpoint: Création d'une application web avec Express et middleware personnalisé

#### Objectif
Dans ce checkpoint, nous allons créer une application web qui contient trois pages distinctes :

1. **Page d'accueil**
2. **Nos Services**
3. **Contactez-nous**

Ces pages doivent répondre aux exigences suivantes :

- Chaque page doit contenir une barre de navigation avec les liens suivants : *Accueil*, *Nos Services*, *Contactez-nous*.
- Vous êtes libre de mettre le contenu que vous souhaitez sur chaque page.
- L'application web doit être accessible **uniquement pendant les heures de travail** (du lundi au vendredi, de 9h à 17h).

#### Instructions

1. Utilisez **Express.js** pour créer le serveur et gérer les routes.
2. Créez un middleware personnalisé pour vérifier l'heure et la disponibilité de l'application en fonction des heures de travail.
3. Les pages doivent être stylées avec du **CSS pur**.
4. Facultatif : Vous pouvez utiliser un moteur de template comme **Pug** ou **EJS** si vous le souhaitez.

---

### Étapes pour le développement

#### 1. Initialiser le projet Express

Commencez par initialiser un nouveau projet Node.js et installez les dépendances nécessaires.

```bash
mkdir web-app-checkpoint
cd web-app-checkpoint
npm init -y
npm install express
```

#### 2. Créer la structure de base du projet

Organisez votre projet en suivant une structure propre. Voici un exemple de structure de fichiers que vous pouvez utiliser :

```
web-app-checkpoint/
│
├── public/                # Contient les fichiers CSS
│   └── style.css          # Fichier CSS pour les styles
│
├── views/                 # Contient les templates (si vous utilisez Pug ou EJS)
│   ├── home.pug
│   ├── services.pug
│   └── contact.pug
│
├── app.js                 # Fichier principal Express
├── middleware.js          # Middleware pour la gestion des horaires
└── package.json
```

---

### Explications des concepts

1. **Middleware personnalisé** : Un middleware dans Express est une fonction qui intercepte les requêtes HTTP avant qu'elles n'atteignent les routes. Ici, nous avons créé un middleware qui vérifie si la requête est faite pendant les heures de travail. Si ce n'est pas le cas, il redirige l'utilisateur avec un message d'erreur.
   
2. **Express et routes** : Express permet de créer un serveur web avec un système de routage simple. Chaque route représente une page différente dans notre application.

3. **Template Engine (Pug)** : Pug est un moteur de templates qui simplifie la création de fichiers HTML dynamiques en utilisant une syntaxe légère.

4. **CSS pur** : L'utilisation de CSS pur permet de styliser les pages web sans avoir recours à des frameworks comme Bootstrap.

---

### Critères de notation

1. **Création d'une barre de navigation dans chaque page** : 5 points
   - La barre de navigation doit être présente sur chaque page avec des liens fonctionnels.
   
2. **Utilisation du middleware** : 5 points
   - Le middleware doit être implémenté correctement pour vérifier les heures de travail.

3. **Utilisation de CSS pur** : 5 points
   - Les pages doivent être stylisées uniquement avec du CSS écrit à la main.

---

### Conclusion

Ce projet montre comment utiliser Express pour créer une application web avec des routes, un middleware personnalisé pour gérer les heures de travail, et des templates pour rendre les pages dynamiques. Vous avez également utilisé du CSS pur pour styliser les pages, ce qui démontre une bonne pratique de base dans le développement web.