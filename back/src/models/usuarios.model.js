const {model, Schema} = require("mongoose");

const usuarioSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    birthday:{
        type:Date,
        required:true,
    },
    avatar:{
        type:String,
        default:'http://image.com'
    },
    rol:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        required:true,
    },
    isPublic:{ /*a revisar*/
        type:Boolean,
        required:true,
    },
});
const usuarioModel = model('usuarios', usuarioSchema);

module.exports =  usuarioModel;