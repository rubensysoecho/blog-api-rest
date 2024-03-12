const { connection } = require("./database/connection")
const express = require('express')
const cors = require('cors')

//Iniciar app
console.log('App iniciada')

// Conectar con la base de datos
connection()

// Crear servidor de Node JS
const app = express()
const port = 3900

// Middleware
app.use(cors())

// Convertir body a objeto js
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Crear rutas
const routes_article = require('./routes/Article')
app.use('/api', routes_article)

// Crear servidor y escuchar peticiones http
app.listen(port, () =>  {
    console.log("Server started on port " + port)
})