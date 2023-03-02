import { Router } from "express";
import { urlsShortenValidate } from '../middlewares/validateUrlsSchema.js'
import { registerShortUrl, getUrlById } from '../controllers/urlsControllers.js'


const urlRouters = Router()

//Routes Here

urlRouters.post('/urls/shorten', urlsShortenValidate, registerShortUrl)
urlRouters.get('/urls/:id', getUrlById)

export default urlRouters