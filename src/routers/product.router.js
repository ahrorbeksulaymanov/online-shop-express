import { Router } from "express";
import productController from "../controllers/product.controller.js";
import tokenCheck from "../middlewares/checkToken.js";

const productRouter = Router()

productRouter.get('/products', productController.GET)
productRouter.get('/products/:productId', productController.GETONE)
productRouter.post('/products', tokenCheck, productController.POST)
productRouter.put('/products/:productId', tokenCheck, productController.PUT)
productRouter.delete('/products/:productId', tokenCheck, productController.DELETE)


export default productRouter;