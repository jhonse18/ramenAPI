import {Router} from "express";

import userRouter from "./userRouter.js";
import recetaRouter from "./recetaRouter.js";

const router  =  Router();

router.get("/",(req,res)=>{
    res.json({data:"hello api"});
})
router.use("/users",userRouter);
router.use("/receta",recetaRouter);
export default router