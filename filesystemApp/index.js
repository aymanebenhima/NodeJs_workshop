const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      // Servir la page HTML
      fs.readFile('./public/index.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erreur du serveur');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else if (req.method === 'POST' && req.url === '/submit-data') {
      // Réception des données soumises
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const parsedData = parse(body);
  
        // Lire les données JSON existantes
        fs.readFile('./data.json', 'utf8', (err, data) => {
          let jsonData = [];
  
          if (!err && data) {
            jsonData = JSON.parse(data); // Charger les données existantes
          }
  
          // Ajouter les nouvelles données
          jsonData.push(parsedData);
  
          // Enregistrer les données mises à jour dans data.json
          fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), err => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Erreur lors de l\'écriture du fichier');
            } else {
              res.writeHead(302, { Location: '/' });
              res.end();
            }
          });
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});