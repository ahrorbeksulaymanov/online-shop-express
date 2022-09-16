import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.post('/login', userController.LOGIN)


export default userRouter;