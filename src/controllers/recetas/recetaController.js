import recetaModel from "../../models/recetaModel.js";
import userController from "../users/userController.js";

const getAll = async()=> {
    try {
        if(!userId){
        const recetas = await recetaModel.find();
        return recetas;
    }
    const user =await userController.getById(userId);
    await user.populate("recetas");
    return user.recetas;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const receta = await recetaModel.findById(id);
        if(!receta){
            return null;
        }
        await receta.populate("users");
        return receta;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const create = async(data) =>{
    try {
        const receta = await recetaModel.create(data);
        receta.users.push(data.owner);
        await receta.save();
        await userController.addReceta(data.owner,receta._id);
        return receta;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const receta = await recetaModel.findByIdAndUpdate(id,data);
        return receta;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const receta = await recetaModel.findByIdAndDelete(id);
        await userController.removeReceta(receta.owner,id)
        return receta;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const addUser = async(projectId,userId) =>{
    try {
        console.log("usuario",userId)
        const receta = await getById(recetaId);
        console.log("receta",project);
        await userController.addReceta(userId,recetaId)
        if(!receta.users.includes(userId)){
            receta.users.push(userId);
            await receta.save();
            return receta
        }
        return receta;
    } catch (error) {
        return null;
    }
}
const removeUser = async(recetaId,userId)=>{
    try {
        console.log("removeUser",recetaId,userId)
        const receta = await getById(recetaId);
        if(userId.equals(receta.owner)){
            return {error:"El owner no se puede borrar"};
        }
        await userController.removeReceta(userId,recetaId);
        if(receta.users.includes(userId)){
            receta.users = receta.users.filter(u=> !u.equals(userId));
            await receta.save();
            return receta
        }
        return receta;
    } catch (error) {
        return null;
    }
}
export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
    addUser,
    removeUser,
}

export default functions;