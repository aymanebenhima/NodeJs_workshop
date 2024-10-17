const Contact = require('../models/contact');

// Rechercher tous les contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.send(contacts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).send({error: 'Contact not found'})
        }
        res.send(contact)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Ajouter un contact
exports.addContact = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.save()
        res.status(201).send(contact)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Mettre à jour un contact
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true}, {runValidators: true})
        if (!contact) {
            return res.status(404).send({error: 'Contact not found'})
        }
        res.send(contact)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Supprimer un contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        if (!contact)
            return res.status(404).send({error: 'Contact not found'})
        res.send({ message: 'Contact supprimé avec succès' })
    } catch (error) {
        res.status(500).send(error.message)
    }
}
