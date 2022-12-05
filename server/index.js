require('dotenv').config()
const express = require('express')
const sequelize = require('./db')

const app = express()
const PORT = process.env.PORT || 5000

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