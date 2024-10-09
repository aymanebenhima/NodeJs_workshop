// Import des modules nécessaires
const http = require('http'); // Pour créer un serveur HTTP
const fs = require('fs'); // Pour interagir avec le système de fichiers
const { v4: uuidv4 } = require('uuid'); // Pour générer des identifiants uniques (UUID)

// Fonction utilitaire pour lire le fichier JSON contenant les utilisateurs
function readUsersFile(callback) {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      callback(err, null); // Si une erreur se produit lors de la lecture, on la passe dans le callback
    } else {
      callback(null, JSON.parse(data)); // Sinon, on parse les données et les retourne via le callback
    }
  });
}

// Fonction utilitaire pour écrire dans le fichier JSON
function writeUsersFile(data, callback) {
  fs.writeFile('users.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      callback(err); // Si une erreur se produit lors de l'écriture, on la passe dans le callback
    } else {
      callback(null); // Sinon, tout s'est bien passé
    }
  });
}

// Création du serveur HTTP
const server = http.createServer((req, res) => {
  const url = req.url; // Récupère l'URL de la requête
  const method = req.method; // Récupère la méthode HTTP (GET, POST, PUT, DELETE)

  // On configure le Content-Type de la réponse pour indiquer qu'on envoie du JSON
  res.setHeader('Content-Type', 'application/json');

  // Route pour récupérer la liste des utilisateurs (GET /users)
  if (url === '/users' && method === 'GET') {
    // Lire le fichier users.json
    readUsersFile((err, users) => {
      if (err) {
        // En cas d'erreur, renvoyer une réponse 500 (Internal Server Error)
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      } else {
        // Si tout est OK, renvoyer la liste des utilisateurs avec un code 200
        res.statusCode = 200;
        res.end(JSON.stringify(users));
      }
    });
  }

  // Route pour ajouter un utilisateur (POST /users)
  else if (url === '/users' && method === 'POST') {
    let body = '';

    // Accumuler les données envoyées dans le corps de la requête
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // Lorsque toutes les données ont été reçues
    req.on('end', () => {
      const newUser = JSON.parse(body); // Parser les données reçues en JSON
      newUser.id = uuidv4(); // Générer un ID unique pour le nouvel utilisateur

      // Lire le fichier users.json pour ajouter le nouvel utilisateur
      readUsersFile((err, users) => {
        if (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ message: 'Internal Server Error' }));
        } else {
          users.push(newUser); // Ajouter le nouvel utilisateur à la liste
          // Écrire la nouvelle liste dans le fichier
          writeUsersFile(users, (err) => {
            if (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ message: 'Internal Server Error' }));
            } else {
              res.statusCode = 201; // Code 201 pour indiquer la création réussie
              res.end(JSON.stringify(newUser)); // Renvoyer le nouvel utilisateur ajouté
            }
          });
        }
      });
    });
  }

  // Route pour mettre à jour un utilisateur (PUT /users/:id)
  else if (url.startsWith('/users/') && method === 'PUT') {
    const id = url.split('/')[2]; // Extraire l'ID de l'utilisateur depuis l'URL
    let body = '';

    // Accumuler les données envoyées dans le corps de la requête
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // Lorsque toutes les données ont été reçues
    req.on('end', () => {
      const updatedUser = JSON.parse(body); // Parser les données reçues en JSON

      // Lire le fichier users.json pour mettre à jour l'utilisateur
      readUsersFile((err, users) => {
        if (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ message: 'Internal Server Error' }));
        } else {
          const userIndex = users.findIndex((u) => u.id === id); // Trouver l'index de l'utilisateur à mettre à jour

          if (userIndex === -1) {
            res.statusCode = 404; // Si l'utilisateur n'est pas trouvé, renvoyer un code 404
            res.end(JSON.stringify({ message: 'User not found' }));
          } else {
            users[userIndex] = { id, ...updatedUser }; // Mettre à jour l'utilisateur avec les nouvelles données
            // Écrire la nouvelle liste dans le fichier
            writeUsersFile(users, (err) => {
              if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
              } else {
                res.statusCode = 200; // Renvoyer un code 200 pour indiquer que la mise à jour a réussi
                res.end(JSON.stringify(users[userIndex]));
              }
            });
          }
        }
      });
    });
  }

  // Route pour supprimer un utilisateur (DELETE /users/:id)
  else if (url.startsWith('/users/') && method === 'DELETE') {
    const id = url.split('/')[2]; // Extraire l'ID de l'utilisateur depuis l'URL

    // Lire le fichier users.json pour supprimer l'utilisateur
    readUsersFile((err, users) => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      } else {
        const userIndex = users.findIndex((u) => u.id === id); // Trouver l'index de l'utilisateur à supprimer

        if (userIndex === -1) {
          res.statusCode = 404; // Si l'utilisateur n'est pas trouvé, renvoyer un code 404
          res.end(JSON.stringify({ message: 'User not found' }));
        } else {
          users.splice(userIndex, 1); // Supprimer l'utilisateur du tableau
          // Écrire la nouvelle liste dans le fichier
          writeUsersFile(users, (err) => {
            if (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ message: 'Internal Server Error' }));
            } else {
              res.statusCode = 200; // Renvoyer un code 200 pour indiquer que la suppression a réussi
              res.end(JSON.stringify({ message: 'User deleted' }));
            }
          });
        }
      }
    });
  }

  // Gérer les routes non trouvées (404)
  else {
    res.statusCode = 404; // Si la route n'existe pas, renvoyer un code 404
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Lancer le serveur sur le port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});