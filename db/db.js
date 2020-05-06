const config = require('../config.json')
const mongoose = require('mongoose')
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}

mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
mongoose.Promise = global.Promise

module.exports = {
    User: require('../users/users.model'),
    Battery: require('../batteries/batteries.model'),
    Electric: require('../electrics/electrics.model')
}