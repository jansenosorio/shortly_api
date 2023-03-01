import { Router } from "express";
import { validateSignUpSchema } from "../middlewares/validateAuthSchema.js";
import { signup } from '../controllers/singUpController.js'

const signUpRouters = Router()

//Routes Here

signUpRouters.post("/signup", validateSignUpSchema, signup)

export default signUpRouters