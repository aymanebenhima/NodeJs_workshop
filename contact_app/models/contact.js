const mongoose = require('mongoose');

// Définir un schéma pour Contact
const contactSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    telephone: { type: String, required: true, unique: true, match: /^\d{10}$/ },
    birthdate: { type: Date, required: false },
    message: { type: String, required: false }
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;