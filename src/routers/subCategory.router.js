import { Router } from "express";
import subCategoryController from "../controllers/subCategory.controller.js";
import tokenCheck from "../middlewares/checkToken.js";

const subCategoryRouter = Router()

subCategoryRouter.get('/sub-categories', subCategoryController.GET)
subCategoryRouter.get('/sub-categories/:subCategoryId', subCategoryController.GETONE)
subCategoryRouter.post('/sub-categories', tokenCheck, subCategoryController.POST)
subCategoryRouter.put('/sub-categories/:subCategoryId', tokenCheck, subCategoryController.PUT)
subCategoryRouter.delete('/sub-categories/:subCategoryId', tokenCheck, subCategoryController.DELETE)


export default subCategoryRouter;