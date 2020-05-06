require('rootpath')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('workers/jwt')
const errorHandler = require('workers/error-handler')

// BodyParser para convertir el contenido de las url en JSON
// y cors para que el servidor trabaje cómodo con urls entrantes
// y salientes hacia y desde otros servidores
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

// jwt para que la autenticacion de la API sea segura
app.use(jwt())

// Routes hacia nuestra API
app.use('/users', require('./users/user.controller'))
app.use('/batteries', require('./batteries/battery.controller'))
app.use('/electrics', require('./electrics/electric.controller'))

// aplicamos el componente de errores por si surge alguno
app.use(errorHandler)

// Arrancamos el servidor
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000
const server = app.listen(port, () => {
    console.log('Server iniciado con éxito en el puerto ' + port)
})