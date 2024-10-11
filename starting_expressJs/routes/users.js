const express = require('express')
const { getUsers, createUser, updateUser, deleteUser } =require('../controllers/userController')

const router = express.Router()

// Route pour avoir la liste des users
router.get('/', getUsers)

// Route pour créer un nouvel user
router.post('/', createUser)

// Route pour update existing user
router.put('/:id', updateUser)

// Router pour delete a user
router.delete('/:id', deleteUser)

module.exports = router