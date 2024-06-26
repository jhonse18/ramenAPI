import recetaController from "./recetaController.js";

const getAll = async(req,res)=>{
    const isAdmin = req.user.role === "admin";
    const userId = isAdmin ? null : req.user._id;
     const recetas = await recetaController.getAll(userId);
    res.json({data:recetas});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const receta = await recetaController.getById(id);
    res.json({data:receta});
}



const create = async(req,res)=>{
    const owner = req.user._id
    const data = {...req.body,owner};
    const receta = await recetaController.create(data);
    res.json({data:receta})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const receta = await recetaController.update(id,req.body);
    res.json({data:receta})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const receta = await recetaController.remove(id);
    res.json({data:receta})
}

const addUser = async(req,res)=>{
    const recetaId = req.params.id;
    const userId = req.body.userId;
    const receta = await recetaController.addUser(recetaId,userId);
    res.json({data:receta})
}

const removeUser = async(req,res)=>{
    const recetaId = req.params.id;
    const userId = req.body.userId;
    const receta = await recetaController.removeUser(recetaId,userId);
    res.json({data:receta})
}


export default{
    getAll,
    getById,
    create,
    update,
    remove,
    addUser,
    removeUser,
}

