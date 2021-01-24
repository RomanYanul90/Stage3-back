const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    ownerId:{type: Types.ObjectId,ref:'Advert'},
    ownerUserName:{type:String},
    title:{type: String, required: true},
    created:{type:Date,default: Date.now()},
    modified:{type:Date},
    description:{type: String, required: true},
    category:{type: String, required: true},
    price:{type: Number, required: true},
    views:{type:Number,default:0}
});

module.exports = model("Advert", schema);