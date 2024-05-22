import mongoose from "mongoose";

const recetaSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
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