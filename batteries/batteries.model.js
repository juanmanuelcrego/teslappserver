const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {type: String, unique: true, required: true},
    voltaje: {type: Number, required: true},
    temperatura: {type: Number, required: true},
})

schema.set('toJSON', {virtuals: true})

module.exports = mongoose.model('Battery', schema)