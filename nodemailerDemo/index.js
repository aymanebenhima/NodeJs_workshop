require('dotenv').config()

const nodemailer = require('nodemailer')

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

// Configuration de l'email
const mailOptions = {
    from: 'Aymane Benhima aymanebenhima@gmail.com ',
    to: 'aymanebenhima@gmail.com ',
    subject: 'Testing Nodemail avec Mailtrap et dotenv',
    text: 'C est un test de Nodemail avec Mailtrap',
    html: '<h1>Congratulations</h1><p>Vous avec bien configuré Nodemailer avec Mailtrap et dotenv</p>'
}

// Envoyer l'email
transport.sendMail(mailOptions, (err, info) => {
    if (err) console.error ('Erreur lors de l\'email', err)
    else console.log('Email est bien envoyer', info.response)
})