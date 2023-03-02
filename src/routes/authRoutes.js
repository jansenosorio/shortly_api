import { Router } from "express";
import { validateSignUpSchema, validateSignInSchema } from "../middlewares/validateAuthSchema.js";
import { signup, signIn } from '../controllers/authController.js'

const authRouters = Router()

//Routes Here

authRouters.post('/signup', validateSignUpSchema, signup)
authRouters.post('/signin', validateSignInSchema, signIn)

export default authRouters