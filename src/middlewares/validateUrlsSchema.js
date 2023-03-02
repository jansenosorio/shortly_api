
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