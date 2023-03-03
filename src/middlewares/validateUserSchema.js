import db from "../database/database_connection.js"

export async function getInformationsAboutUser(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', "")

    try {
        const { rows } = await db.query(`
        SELECT url.id, url."userId", url."tokenId", "userToken"."tokenId" as token
        FROM url
        JOIN "userToken"
        ON url."tokenId" = "userToken".id
        `)

        //insert only itens that was created by token sended on header
        const bodyByToken = rows.filter(elm => elm.token === token)

        //verify if token exists
        const tokenExists = bodyByToken.length > 0
        if (!tokenExists) return res.sendStatus(401)

        res.locals.usersInfomations = token

    } catch (error) {
        res.status(500).send(error)
    }

    next()
}