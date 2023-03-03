
import db from "../database/database_connection.js";
import { urlsSchema } from '../schema/urlsSchema.js'


export async function urlsShortenValidate(req, res, next) {
    const { authorization } = req.headers
    const bodyUrl = req.body
    const token = authorization?.replace('Bearer ', "")
    const { url } = req.body

    const { error } = urlsSchema.validate(bodyUrl, { abortEarly: false })

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }

    try {

        const userToken = await db.query(`
            SELECT *
            FROM "userToken"
            WHERE "tokenId" = $1
        `, [token])

        const isValidToken = userToken.rowCount > 0

        if (!isValidToken) return res.sendStatus(401)

        const { id, userId } = userToken.rows[0]

        res.locals.usersTokens = { id, userId, url }

    } catch (error) {
        res.status(500).send(error)
    }

    next()
}

export async function deleteUrlValidate(req, res, next) {
    const { id } = req.params
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', "")


    try {

        // get informations from database, where token and id its stored
        const { rows } = await db.query(`
        SELECT url.*, "userToken"."tokenId" as token, "userToken"."userId" as "userTokenId"
        FROM url
        JOIN "userToken"
        ON url."tokenId" = "userToken".id
    `)

        console.log(rows)

        //verify if id exists
        const isValidId = rows.filter(elm => elm.id === Number(id))
        if (!isValidId.length > 0) return res.sendStatus(404)
        //verify if token is valid
        const isTokenValid = rows.filter(elm => elm.token === token)
        if (!isTokenValid.length > 0) return res.sendStatus(401)
        //verify if id sended is valid
        const isUrlValid = rows.filter(elm => elm.id === Number(id))
        if (!isUrlValid[0].token === token) return res.sendStatus(401)

        res.locals.urlId = id

    } catch (error) {
        res.status(500).send(error)
    }

    next()
}

