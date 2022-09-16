import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import tokenCheck from "../middlewares/checkToken.js";

const categoryRouter = Router()

categoryRouter.get('/categories', categoryController.GET)
categoryRouter.get('/categories/:categoryId', categoryController.GETONE)
categoryRouter.post('/categories', tokenCheck, categoryController.POST)
categoryRouter.put('/categories/:categoryId', tokenCheck, categoryController.PUT)
categoryRouter.delete('/categories/:categoryId', tokenCheck, categoryController.DELETE)


export default categoryRouter;