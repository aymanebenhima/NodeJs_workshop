// Importation des modules nécessaires
const fs = require('fs') // Pour lire et écrire des fichiers
const http = require('http') // Pour créer un serveur HTTP
const url = require('url') // Pour analyser les URL
const path = require('path') // Pour manipuler les chemins de fichiers

// Fonction pour lire les notes depuis un fichier JSON
const readNotes = () => {
    // Lecture synchrone du fichier 'notes.json'
    const data = fs.readFileSync('notes.json')
    // Conversion du contenu en format JSON pour manipuler en tant qu'objet JavaScript
    return JSON.parse(data)
}

// Fonction pour écrire des notes dans le fichier JSON
const writeNotes = (notes) => {
    // Écriture synchrone dans 'notes.json', avec un format JSON lisible
    fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2))
}

// Création du serveur HTTP
const server = http.createServer((req, res) => {
    // Analyse de l'URL de la requête entrante
    const parseUrl = url.parse(req.url, true)
    // Capture de la méthode HTTP utilisée (GET, POST, etc.)
    const method = req.method

    // Servir le fichier HTML si la requête correspond à '/public/index.html'
    if (parseUrl.pathname === '/public/index.html') {
        // Lecture du fichier 'public/index.html'
        fs.readFile('public/index.html', (err, content) => {
            if (err) {
                // Si une erreur survient (ex: fichier introuvable), on renvoie une réponse 404
                res.writeHead(404)
                res.end('Fichier non trouvé')
            } else {
                // Si le fichier est trouvé, on le renvoie avec un statut 200 (succès)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end(content)
            }
        })
    }
    // Servir le fichier CSS si la requête correspond à '/public/styles.css'
    else if (parseUrl.pathname === '/public/styles.css') {
        fs.readFile('public/styles.css', (err, content) => {
            if (err) {
                res.writeHead(404)
                res.end('Fichier non trouvé')
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(content)
            }
        })
    }
    // Servir le fichier JavaScript si la requête correspond à '/public/script.js'
    else if (parseUrl.pathname === '/public/script.js') {
        fs.readFile('public/script.js', (err, content) => {
            if (err) {
                res.writeHead(404)
                res.end('Fichier non trouvé')
            } else {
                res.writeHead(200, {'Content-Type': 'application/javascript'})
                res.end(content)
            }
        })
    }
    
    // Gestion de la requête GET pour récupérer toutes les notes
    else if (parseUrl.pathname === '/notes' && method === 'GET') {
        // Lecture des notes
        const notes = readNotes()
        // Réponse avec un statut 200 et un contenu JSON
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(notes))
    }

    // Gestion de la requête POST pour ajouter une nouvelle note
    else if (parseUrl.pathname === '/notes' && method === 'POST') {
        let body = ''
        // Récupération des données envoyées dans la requête POST
        req.on('data', (chunk) => {
            body += chunk.toString() // Construction du corps de la requête
        })

        // Une fois toutes les données reçues
        req.on('end', () => {
            // Analyse des données reçues en JSON
            const { title, content } = JSON.parse(body)
            const notes = readNotes() // Lecture des notes existantes
            // Vérification si une note avec le même titre existe déjà
            const duplicate = notes.find((note) => note.title === title)
            
            if (duplicate) {
                // Si le titre existe déjà, on renvoie une erreur 400
                res.writeHead(400)
                return res.end(JSON.stringify({ error: 'Le titre existe déjà'}))
            }
            // Ajout de la nouvelle note à la liste
            notes.push({ title, content })
            // Écriture des notes mises à jour dans le fichier
            writeNotes(notes)
            // Réponse avec un statut 201 (création réussie)
            res.writeHead(201)
            res.end(JSON.stringify({ message: 'Note ajoutée avec succès ' }))
        })
    }

    // Gestion de la requête DELETE pour supprimer une note spécifique
    else if (parseUrl.pathname === '/notes' && method === 'DELETE') {
        const title = parseUrl.query.title // Récupération du titre à supprimer à partir de l'URL
        const notes = readNotes() // Lecture des notes
        // Filtrage des notes pour enlever celle avec le titre spécifié
        const filteredNotes = notes.filter((note) => note.title !== title)
        if (notes.length === filteredNotes.length) {
            // Si aucune note n'est supprimée (car la note n'existe pas), on renvoie une erreur 404
            res.writeHead(404)
            return res.end(JSON.stringify({ error: 'Note non trouvée'}))
        }
        // Mise à jour du fichier avec la liste filtrée
        writeNotes(filteredNotes)
        // Réponse avec un statut 200 (succès)
        res.writeHead(200)
        res.end(JSON.stringify({ message: 'Note supprimée avec succès' }))
    }

    // Gestion de la requête GET pour récupérer une note spécifique
    else if (parseUrl.pathname === '/note' && method === 'GET') {
        const title = parseUrl.query.title // Récupération du titre de la note recherchée
        const notes = readNotes() // Lecture des notes
        const note = notes.find((note) => note.title === title) // Recherche de la note par titre
        if (!note) {
            // Si la note n'existe pas, renvoie d'une erreur 404
            res.writeHead(404)
            return res.end(JSON.stringify({ error: 'Note non trouvée' }))
        }

        // Si la note est trouvée, renvoie avec succès la note en JSON
        res.writeHead(200)
        res.end(JSON.stringify(note))
    }

    // Gestion de la requête PUT pour modifier une note existante
    else if (parseUrl.pathname === '/notes' && method === 'PUT') {
        let body = ''
        // Récupération des données envoyées pour la modification
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            // Analyse des données reçues (ancien titre, nouveau titre et nouveau contenu)
            const { oldTitle, newTitle, newContent } = JSON.parse(body)
            const notes = readNotes() // Lecture des notes existantes
            const noteIndex = notes.findIndex((note) => note.title === oldTitle) // Recherche de l'index de la note
            
            if (noteIndex === -1) {
                // Si la note à modifier n'est pas trouvée, renvoie d'une erreur 404
                res.writeHead(404)
                return res.end(JSON.stringify({ error: 'Note non trouvée' }))
            }
            // Mise à jour de la note avec les nouvelles informations
            notes[noteIndex] = { title: newTitle, content: newContent }
            // Écriture des modifications dans le fichier
            writeNotes(notes)
            // Réponse avec un statut 200 (succès)
            res.writeHead(200)
            res.end(JSON.stringify({ message: 'Note mise à jour avec succès ' }))
        })
    }

    // Si l'URL demandée ne correspond à aucune des routes définies, renvoie d'une erreur 404
    else {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'URL non trouvée!' }))
    }
})

// Démarrage du serveur sur le port 3000
server.listen(3000, () => {
    console.log('Server is running ...') // Affichage d'un message lorsque le serveur démarre
})