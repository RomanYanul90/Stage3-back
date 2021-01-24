const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    password: {type: String, required: true},
});

module.exports = model("User", schema);