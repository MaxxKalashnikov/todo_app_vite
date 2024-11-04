import dotenv from 'dotenv';
import { Router } from "express"
import { postRegistration, postLogin } from "../controllers/UserController.js";

dotenv.config();
const userRouter = Router()

userRouter.post('/register', postRegistration)

userRouter.post('/login', postLogin)

export default userRouter