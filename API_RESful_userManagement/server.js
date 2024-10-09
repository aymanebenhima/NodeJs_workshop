const http = require('http');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Fonction utilitaire pour lire le fichier JSON
function readUsersFile(callback) {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(data));
    }
  });
}

// Fonction utilitaire pour écrire dans le fichier JSON
function writeUsersFile(data, callback) {
  fs.writeFile('users.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Set response header
  res.setHeader('Content-Type', 'application/json');

  // Gérer la route GET /users pour obtenir la liste des utilisateurs
  if (url === '/users' && method === 'GET') {
    readUsersFile((err, users) => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(users));
      }
    });
  }
  
  // Gérer la route POST /users pour ajouter un utilisateur
  else if (url === '/users' && method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const newUser = JSON.parse(body);
      newUser.id = uuidv4(); // Générer un ID unique pour l'utilisateur

      readUsersFile((err, users) => {
        if (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ message: 'Internal Server Error' }));
        } else {
          users.push(newUser);
          writeUsersFile(users, (err) => {
            if (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ message: 'Internal Server Error' }));
            } else {
              res.statusCode = 201;
              res.end(JSON.stringify(newUser));
            }
          });
        }
      });
    });
  }

  // Gérer la route PUT /users/:id pour modifier un utilisateur
  else if (url.startsWith('/users/') && method === 'PUT') {
    const id = url.split('/')[2];
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const updatedUser = JSON.parse(body);

      readUsersFile((err, users) => {
        if (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ message: 'Internal Server Error' }));
        } else {
          const userIndex = users.findIndex((u) => u.id === id);

          if (userIndex === -1) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'User not found' }));
          } else {
            users[userIndex] = { id, ...updatedUser };
            writeUsersFile(users, (err) => {
              if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
              } else {
                res.statusCode = 200;
                res.end(JSON.stringify(users[userIndex]));
              }
            });
          }
        }
      });
    });
  }

  // Gérer la route DELETE /users/:id pour supprimer un utilisateur
  else if (url.startsWith('/users/') && method === 'DELETE') {
    const id = url.split('/')[2];

    readUsersFile((err, users) => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      } else {
        const updatedUsers = users.filter((user) => user.id !== id);

        if (users.length === updatedUsers.length) {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: 'User not found' }));
        } else {
          writeUsersFile(updatedUsers, (err) => {
            if (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ message: 'Internal Server Error' }));
            } else {
              res.statusCode = 200;
              res.end(JSON.stringify({ message: 'User deleted' }));
            }
          });
        }
      }
    });
  }

  // Si la route n'existe pas
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});