import {Router} from "express";

import recetaApiController from "../controllers/recetas/recetaApiController.js";


const router  = Router();

router.get("/",recetaApiController.getAll);
router.get("/:id",recetaApiController.getById);
router.post("/",recetaApiController.create);
router.put("/:id",recetaApiController.update);
router.delete("/:id",recetaApiController.remove);
router.post("/:id/user",recetaApiController.addUser);
router.delete("/:id/user",recetaApiController.removeUser);

export default router;