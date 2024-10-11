const fs = require('fs-extra')
const { v4: uuidv4 } = require('uuid')
const path  = require('path')

const usersFilePath = path.join(__dirname, '../data/users.json')

async function readUsersFile() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (err) {
        throw new Error('Error of reading users file')
    }
}

async function writeUsersFile(users) {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(data, null, 2))
    } catch (err) {
        throw new Error('Error of writing users file')
    }
}

// Récupération des utilisateurs 
exports.getUsers = async(req, res, next) => {
    try {
        const users = await readUsersFile()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const users = await readUsersFile()
        const newUser = {
            id: uuidv4(),
            ...req.body
        }
        users.push(newUser)
        await writeUsersFile(users)
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const users = await readUsersFile()
        const id = req.params.id
        const userIndex = users.findIndex((u) => u.id === id)
        if (userIndex === -1)
            return res.status(404).json({ message: 'User not found' })

        users[userIndex] = { id, ...req.body }
        await writeUsersFile(users)
        res.status(200).json(users[userIndex])
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const users = await readUsersFile()
        const id = req.params.id
        const userIndex = users.findIndex((u) => u.id === id)
        if (userIndex === -1)
            return res.status(404).json({ message: 'User not found' })

        users.splice(userIndex, 1)
        await writeUsersFile(users)
        res.status(200).json({ message: 'User deleted' })
    } catch (err) {
        next(err)
    }
}