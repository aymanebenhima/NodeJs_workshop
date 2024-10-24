const Note = require('../models/note');

// Rechercher tous les notes
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        res.send(notes)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send({error: 'Note not found'})
        }
        res.send(note)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Ajouter un note
exports.addNote = async (req, res) => {
    try {
        const note = new Note(req.body)
        await note.save()
        res.status(201).send(note)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Mettre à jour un note
exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true}, {runValidators: true})
        if (!note) {
            return res.status(404).send({error: 'note not found'})
        }
        res.send(note)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Supprimer un note
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id)
        if (!note)
            return res.status(404).send({error: 'note not found'})
        res.send({ message: 'note supprimé avec succès' })
    } catch (error) {
        res.status(500).send(error.message)
    }
}
