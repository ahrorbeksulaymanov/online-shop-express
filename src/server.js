import bodyParser from "body-parser";
import express from "express";
import {PORT} from './constants/index.js'
import categoryRouter from "./routers/category.router.js";
import productRouter from "./routers/product.router.js";
import subCategoryRouter from "./routers/subCategory.router.js";
import userRouter from "./routers/user.router.js";
import cors from 'cors'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors("*"));

app.use(userRouter)
app.use(categoryRouter)
app.use(subCategoryRouter)
app.use(productRouter)

app.listen(PORT, () => console.log("server is running PORT: " + PORT))