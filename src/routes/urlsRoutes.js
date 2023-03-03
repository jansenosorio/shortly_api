import { Router } from "express";
import { urlsShortenValidate, deleteUrlValidate } from '../middlewares/validateUrlsSchema.js'
import { registerShortUrl, getUrlById, redirectByShortUrl, deleteUrlById } from '../controllers/urlsControllers.js'


const urlRouters = Router()

//Routes Here

urlRouters.post('/urls/shorten', urlsShortenValidate, registerShortUrl)
urlRouters.get('/urls/:id', getUrlById)
urlRouters.get('/urls/open/:shortUrl', redirectByShortUrl)
urlRouters.delete('/urls/:id', deleteUrlValidate, deleteUrlById)


export default urlRouters