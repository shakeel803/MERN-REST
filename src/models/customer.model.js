let mongoose = require("mongoose")

const server = 'ds149744.mlab.com:49744'
const db = 'api'
const username = 'shakeel803'
const pwd = '12345abcde'

mongoose.connect(`mongodb://${username}:${pwd}@${server}/${db}`)

let CustomerSchema = mongoose.Schema({
    name: String,
    email:{
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)