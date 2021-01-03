const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    adverts: [{type: Types.ObjectId,ref:'Advert'}]
})

module.exports = model("User", schema)