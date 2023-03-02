
import db from "../database/database_connection.js";
import { nanoid } from "nanoid";

export async function registerShortUrl(req, res) {

    const { id, userId, url } = res.locals.usersTokens
    const tokenId = id
    let shortUrl = url
    shortUrl = nanoid(10)

    try {

        await db.query(`
            INSERT INTO url ("userId","tokenId",url,"shortUrl")
            VALUES ($1, $2, $3, $4)
        `, [userId, tokenId, url, shortUrl])

        const { rows } = await db.query(`
            SELECT *
            FROM url
            WHERE "shortUrl" = $1
        `, [shortUrl])

        const body = {
            id: rows[0].id,
            shortUrl: shortUrl
        }

        res.status(201).send(body)

    } catch (error) {
        res.status(500).send(error)
    }
}