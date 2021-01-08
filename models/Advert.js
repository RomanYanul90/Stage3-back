const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    creator:{type: Types.ObjectId,ref:'Advert'},
    title:{type: String, required: true},
    created:{type:Date,default: Date.now},
    modified:{type:Date,required:true},
    description:{type: String, required: true},
    category:{type: String, required: true},
    price:{type: Number, required: true},
    views:{type:Number,default:0}
})

module.exports = model("Advert", schema)