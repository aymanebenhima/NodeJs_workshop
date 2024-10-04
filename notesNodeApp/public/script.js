document.getElementById('noteForm').addEventListener('submit', async function(event) {
    event.preventDefault()

    const title = document.getElementById("title").value
    const content = document.getElementById("content").value

    const response = await fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content })
    })

    const result = await response.json()
    alert(result.message || result.error)
    if (response.ok) {
        loadNotes()
        document.getElementById('noteForm').reset()
    }
})

async function loadNotes() {
    const response = await fetch('/notes')
    const notes = await response.json()
    const noteList = document.getElementById('noteList')
    noteList.innerHTML = ''

    notes.forEach(note => {
        const listItem = document.createElement('li')
        listItem.className = 'note-item'
        listItem.innerHTML = `
            <strong>${note.title}</strong>
            <button onclick="deleteNote('${note.title}')">Supprimer</button>
        `
        noteList.appendChild(listItem)
    })
}

async function deleteNote(title) {
    const response = await fetch(`/notes?title=${title}`, { method: 'DELETE' })
    const result = await response.json()
    alert(result.message || result.error)
    if (response.ok) {
        loadNotes()
    }
}

document.getElementById('editForm').addEventListener('submit', async function(event) {
    event.preventDefault()

    const oldTitle = document.getElementById("oldTitle").value
    const newTitle = document.getElementById("newTitle").value
    const newContent = document.getElementById("newContent").value

    const response = await fetch('/notes', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldTitle, newTitle, newContent })
    })

    const result = await response.json()
    alert(result.message || result.error)
    if (response.ok) {
        loadNotes()
        document.getElementById('editForm').reset()
    }
})

loadNotes()