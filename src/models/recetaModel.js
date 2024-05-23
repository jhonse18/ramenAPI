import mongoose from "mongoose";

const recetaSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    ingredients:{
        type: String,
        required:true
    },
    instructions:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    users:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'users'
        }
    ]
    
});

const recetaModel = mongoose.model("recetas",recetaSchema);

export default recetaModel;