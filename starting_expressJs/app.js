const express = require('express')
const usersRoutes = require('./routes/users')

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/users', usersRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error'  })
})

app.listen(PORT, () => {
    console.log('Server is running on hhtp://localhost:${PORT}')
})