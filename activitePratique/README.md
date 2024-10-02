# Workshop Node.js - Introduction par la pratique

## Objectif
Dans ce workshop, nous allons découvrir Node.js à travers une série d'exercices guidés. Chaque exercice vous permettra d'explorer des fonctionnalités clés de Node.js en créant des fichiers séparés pour chaque problème.

## Prérequis
- Avoir Node.js installé sur votre machine. Vous pouvez le télécharger [ici](https://nodejs.org/).

## Instructions

### 1. Créer un programme "Hello World"

**Fichier :** `hello-world.js`

1. **Objectif :** Imprimez "HELLO WORLD" dans la console.
2. **Indice :** Utilisez la fonction `console.log` pour afficher du texte dans la console.

**Étapes :**
- Créez un fichier nommé `hello-world.js`.
- Écrivez un programme qui affiche **HELLO WORLD** lorsqu'il est exécuté avec Node.js.
- **Exécuter :** `node hello-world.js`

---

### 2. Créer un serveur simple

**Fichier :** `server.js`

1. **Objectif :** Créez un serveur qui écoute sur le port 3000 et qui répond avec un message HTML simple.
2. **Indice :** Utilisez le module `http` pour créer un serveur.

**Étapes :**
- Créez un fichier nommé `server.js`.
- Utilisez `http.createServer()` pour créer un serveur.
- Le serveur doit répondre avec `<h1>Hello Node!!!!</h1>\n` lorsqu'un utilisateur accède à l'URL `http://localhost:3000`.
- **Exécuter :** `node server.js`
  
---

### 3. Travailler avec le système de fichiers (File System)

**Fichiers :** `write-file.js`, `read-file.js`

1. **Objectif 1 :** Créez un fichier texte avec un message.
2. **Objectif 2 :** Lisez ce fichier et affichez son contenu dans la console.
3. **Indice :** Utilisez le module `fs` pour écrire et lire des fichiers.

**Étapes :**
- Créez un fichier `write-file.js` qui :
  - Utilise `fs.writeFileSync` pour créer un fichier `welcome.txt` avec le contenu **Hello Node**.
- Créez un fichier `read-file.js` qui :
  - Utilise `fs.readFileSync` pour lire le contenu de `welcome.txt` et l'afficher dans la console.
- **Exécuter :** `node write-file.js` puis `node read-file.js`

---

### 4. Générer un mot de passe aléatoire

**Fichier :** `password-generator.js`

1. **Objectif :** Générer et afficher un mot de passe aléatoire.
2. **Indice :** Utilisez un package npm pour générer des mots de passe.

**Étapes :**
- Installez le package `generate-password` avec la commande suivante :
  ```bash
  npm install generate-password
  ```
- Créez un fichier `password-generator.js`.
- Utilisez `generatePassword.generate()` pour générer un mot de passe aléatoire.
- Affichez ce mot de passe dans la console avec `console.log`.
- **Exécuter :** `node password-generator.js`

Référence : [Documentation generate-password](https://www.npmjs.com/package/generate-password)

---

### 5. Envoyer un email

**Fichier :** `email-sender.js`

1. **Objectif :** Envoyez un email à vous-même.
2. **Indice :** Utilisez le module `nodemailer` pour envoyer un email.

**Étapes :**
- Installez le package `nodemailer` avec la commande suivante :
  ```bash
  npm install nodemailer
  ```
- Créez un fichier `email-sender.js`.
- Configurez un transporteur avec `nodemailer.createTransport()`.
- Utilisez la méthode `sendMail` pour envoyer un email de test.
- **Exécuter :** `node email-sender.js`

Référence : [Tutoriel Nodemailer](https://www.w3schools.com/nodejs/nodejs_email.asp)

---

## Conclusion
Ce workshop vous a permis d'explorer les bases de Node.js à travers des exemples pratiques. N'oubliez pas d'expérimenter davantage avec chaque exercice pour mieux comprendre les concepts. Si vous avez des questions, n'hésitez pas à consulter la documentation officielle de Node.js [ici](https://nodejs.org/en/docs/).