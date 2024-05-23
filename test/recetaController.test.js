import connectDB from "../src/config/mongo.js";
import mongoose from 'mongoose';
import recetaController from "../src/controllers/recetas/recetaController.js";
import userController from "../src/controllers/users/userController.js"

let recetaId = null;
let userId = null;
let newUser;
describe("Test de recetaController",()=>{
    beforeAll(async ()=>{
        await connectDB();
        try{
            await mongoose.connection.collections["recetas"].drop();
            newUser = await userController.getByProperty("email","mail");
            if(!newUser){
                newUser = await userController.create({username:"nombre",email:"mail",password:"1234"});
            }
        }
        catch(error){
            console.error(error);
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })

    test("Crear receta",async()=>{
        const users = await userController.getAll();
        console.log("usuario",users[0])
        const recetaData = {
            name: "pruebas",
            owner: users[0],
            users:users
        }
        const receta = await recetaController.create(recetaData)
        recetaId = receta._id;
        expect(receta).not.toBeNull();
        expect(receta.owner).toEqual(users[0]._id);
    })
    test("Añadir usuario",async()=>{
        
        userId = newUser._id;
        const receta = await recetaController.addUser(recetaId,newUser._id);
        expect(receta).not.toBeNull();
        expect(receta.users).toContain(newUser._id);

    })
    test("Quitar usuario",async()=>{
        const receta = await recetaController.removeUser(recetaId,userId);
        expect(receta).not.toBeNull();
        expect(receta.users).not.toContain(userId);
    })
})