require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const model = require('./models/models')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bruhhhh')
})

const start = async () => {
    try {
        // Подключаемся к БД
        await sequelize.authenticate()
        // Сверяем сост. БД со схемой данных
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}...`))
    } catch (err) {
        console.log('Server starting error: ', err)
    }
}

start()