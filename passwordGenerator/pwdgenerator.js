const generator = require('crypto');

const generatePassword = (length) => {
    return generator
        .randomBytes(length)
        .toString('base64')
        .slice(0,length)
        .replace(/\+/g, '0')
        .replace(/\//g, '0')
} 

const password = generatePassword(12)
console.log('Password est générée =>   ' + password);