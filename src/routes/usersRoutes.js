import { Router } from "express";
import { getInformationsAboutUser } from '../middlewares/validateUserSchema.js'
import { getUserInformation, getUserRanking } from '../controllers/usersControllers.js'


const usersRoutes = Router()

//Routes Here
usersRoutes.get('/users/me', getInformationsAboutUser, getUserInformation)
usersRoutes.get('/ranking', getUserRanking)


export default usersRoutes