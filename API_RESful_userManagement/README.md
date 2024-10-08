## **Exercice : Créer une API RESTful simple avec Node.js**
---

#### **Objectif :**
Créer une petite API RESTful en utilisant Node.js, sans utiliser de frameworks comme Express. L'objectif est de renforcer les compétences en création de serveurs HTTP, en manipulation des données (GET, POST, PUT, DELETE), et en gestion des requêtes.

#### **Prérequis :**
- Avoir Node.js installé sur la machine.
- Connaissance des modules `http` et `fs` de Node.js.
- Compréhension des méthodes HTTP (GET, POST, PUT, DELETE).

#### **Description de l'exercice :**
Vous allez créer un serveur HTTP basique qui gère un ensemble de données fictives (par exemple, des utilisateurs). Le serveur devra permettre les opérations suivantes :
1. **Lister les utilisateurs** (GET).
2. **Ajouter un utilisateur** (POST).
3. **Modifier un utilisateur** (PUT).
4. **Supprimer un utilisateur** (DELETE).

Les données des utilisateurs seront stockées dans un fichier JSON (par exemple, `users.json`).

#### **Étapes détaillées :**

1. **Créer un serveur avec Node.js :**
   - Créez un fichier `server.js`.
   - Utilisez le module `http` pour créer un serveur qui écoute sur le port 3000.

2. **Gérer les requêtes :**
   - Le serveur doit répondre à différentes routes en fonction de la méthode HTTP et de l'URL.

   **Exemples :**
   - GET `/users` : Renvoie la liste des utilisateurs.
   - POST `/users` : Ajoute un nouvel utilisateur.
   - PUT `/users/:id` : Modifie un utilisateur existant.
   - DELETE `/users/:id` : Supprime un utilisateur existant.

3. **Travailler avec le système de fichiers :**
   - Les données des utilisateurs doivent être stockées dans un fichier JSON (`users.json`).
   - Utilisez `fs.readFile` et `fs.writeFile` pour lire et écrire dans le fichier.

4. **Valider les entrées :**
   - Assurez-vous que les données envoyées lors des requêtes POST et PUT sont valides (ex. : un utilisateur doit avoir un nom et un email).

5. **Envoyer des réponses JSON :**
   - Les réponses du serveur doivent être au format JSON.
   - Utilisez `res.setHeader('Content-Type', 'application/json')` pour définir le type de contenu.

---

#### **Instructions supplémentaires et indices :**

1. **Création du fichier JSON initial :**
   - Créez un fichier `users.json` contenant une liste d'utilisateurs fictifs :
     ```json
     [
       { "id": 1, "name": "Alice", "email": "alice@example.com" },
       { "id": 2, "name": "Bob", "email": "bob@example.com" }
     ]
     ```

2. **Gestion des routes :**
   - Utilisez `req.url` pour vérifier quelle URL est demandée, et `req.method` pour savoir si c'est un GET, POST, PUT ou DELETE.
   - Indice : Pour récupérer les segments dynamiques de l'URL (comme l'`id`), vous pouvez utiliser `req.url.split('/')`.

3. **Lecture et écriture des données :**
   - Lors de chaque opération (ajout, modification, suppression), lisez d'abord le fichier `users.json`, modifiez les données, puis réécrivez le fichier avec les nouvelles données.
   - Indice : Utilisez `JSON.stringify()` et `JSON.parse()` pour manipuler les données JSON.

4. **Ajouter un utilisateur :**
   - Pour la requête POST, vous devez lire le corps de la requête pour obtenir les nouvelles données de l'utilisateur.
   - Indice : Utilisez `req.on('data')` pour récupérer les données envoyées par le client.

5. **Modifier et supprimer un utilisateur :**
   - Pour les requêtes PUT et DELETE, vous devez d'abord récupérer l'`id` de l'utilisateur à partir de l'URL, puis modifier ou supprimer l'utilisateur correspondant dans le fichier JSON.
   - Indice : Utilisez `Array.prototype.find()` pour trouver un utilisateur par son `id`, et `Array.prototype.filter()` pour le supprimer.

6. **Envoyer les bonnes réponses HTTP :**
   - Assurez-vous que le serveur envoie les bonnes réponses, par exemple :
     - 200 pour une requête réussie.
     - 201 pour une création réussie.
     - 404 si un utilisateur n'est pas trouvé.

---

#### **Bonus (optionnel) :**
- **Améliorer les erreurs :** Gérez les erreurs possibles, comme une tentative d'ajout d'un utilisateur sans nom ou email, et envoyez une réponse avec un code 400 (Bad Request).
- **Pagination (avancé) :** Ajoutez une fonctionnalité de pagination dans la route GET `/users`, en permettant de limiter le nombre d'utilisateurs renvoyés par requête (ex. : `/users?page=1&limit=10`).

---

#### **Exécution :**
1. Lancez votre serveur avec `node server.js`.
2. Testez les différentes routes en utilisant `curl` ou un outil comme Postman.

#### **Exemples de requêtes :**

- **Lister les utilisateurs (GET) :**
  ```
  curl http://localhost:3000/users
  ```

- **Ajouter un utilisateur (POST) :**
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"name":"Charlie","email":"charlie@example.com"}' http://localhost:3000/users
  ```

- **Modifier un utilisateur (PUT) :**
  ```
  curl -X PUT -H "Content-Type: application/json" -d '{"name":"Charlie Updated","email":"charlie.updated@example.com"}' http://localhost:3000/users/3
  ```

- **Supprimer un utilisateur (DELETE) :**
  ```
  curl -X DELETE http://localhost:3000/users/3
  ```