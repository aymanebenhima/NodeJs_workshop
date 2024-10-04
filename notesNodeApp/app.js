const fs = require('fs')
const http = require('http')
const url = require('url')
const path = require('path')

const readNotes = () => {
    const data = fs.readFileSync('notes.json')
    return JSON.parse(data)
}

const writeNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2))
}

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true)
    const method = req.method

    if (parseUrl.pathname === '/public/index.html') {
        fs.readFile('public/index.html', (err, content) => {
            if (err) {
                res.writeHead(404)
                res.end('Fichier non trouvé')
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end(content)
            }
        })
    }  else if (parseUrl.pathname === '/public/styles.css') {
        fs.readFile('public/styles.css', (err, content) => {
            if (err) {
                res.writeHead(404)
                res.end('Fichier non trouvé')
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(content)
            }
        })
    } else if (parseUrl.pathname === '/public/script.js') {
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

    else if (parseUrl.pathname === '/notes' && method === 'GET') {
        const notes = readNotes()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(notes))
    }
    
    else if (parseUrl.pathname === '/notes' && method === 'POST') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            const { title, content } = JSON.parse(body)
            const notes = readNotes()
            const duplicate = notes.find((note) => note.title === title)
            
            if (duplicate) {
                res.writeHead(400)
                return res.end(JSON.stringify({ error: 'Le titre existe déjà'}))
            }
            notes.push({ title, content })
            writeNotes(notes)
            res.writeHead(201)
            res.end(JSON.stringify({ message: 'Note ajoutée avec succes '}))
        })
    }

    else if (parseUrl.pathname === '/notes' && method === 'DELETE') {
        const title = parseUrl.query.title
        const notes = readNotes()
        const filteredNotes = notes.filter((note) => note.title !== title)
        if (notes.length === filteredNotes.length) {
            res.writeHead(404)
            return res.end(JSON.stringify({ error: 'Note non trouvée'}))
        }
        writeNotes(filteredNotes)
        res.writeHead(200)
        res.end(JSON.stringify({ message: 'Note supprimée avec succes'}))
    }

    else if (parseUrl.pathname === '/note' && method === 'GET') {
        const title = parseUrl.query.title
        const notes = readNotes()
        const note = notes.find((note) => note.title === title)
        if (!note) {
            res.writeHead(404)
            return res.end(JSON.stringify({ error: 'Note non trouvée'}))
        }

        res.writeHead(200)
        res.end(JSON.stringify(note))
    }

    else if (parseUrl.pathname === '/notes' && method === 'PUT') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            const { oldTitle, newTitle, newContent } = JSON.parse(body)
            const notes = readNotes()
            const noteIndex = notes.findIndex((note) => note.title === oldTitle)
            
            if (noteIndex === -1) {
                res.writeHead(404)
                return res.end(JSON.stringify({ error: 'Note non trouvé'}))
            }
            notes[noteIndex] = { title: newTitle, content: newContent }
            writeNotes(notes)
            res.writeHead(200)
            res.end(JSON.stringify({ message: 'Note mise à jour avec succes '}))
        })
    }

    else {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'URL non trouvee!' }))
    }


})

server.listen(3000, () => {
    console.log('Server is running ...')
})