import { Router } from "express";
import { urlsShortenValidate } from '../middlewares/validateUrlsSchema.js'
import { registerShortUrl } from '../controllers/urlsControllers.js'


const urlRouters = Router()

//Routes Here

urlRouters.post('/urls/shorten', urlsShortenValidate, registerShortUrl)
urlRouters.post('/')

export default urlRouters