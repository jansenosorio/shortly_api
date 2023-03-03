import { Router } from "express";
import { getInformationsAboutUser } from '../middlewares/validateUserSchema.js'
import { getUserInformation } from '../controllers/usersControllers.js'


const usersRoutes = Router()

//Routes Here
usersRoutes.get('/users/me', getInformationsAboutUser, getUserInformation)


export default usersRoutes