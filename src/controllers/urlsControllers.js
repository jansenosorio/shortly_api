
import db from "../database/database_connection.js";
import { nanoid } from "nanoid";
import { query } from "express";

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

export async function getUrlById(req, res) {
    const { id } = req.params

    try {
        const { rows, rowCount } = await db.query(`
            SELECT *
            FROM url
            WHERE id = $1
        `, [id])

        const isValidId = rowCount > 0

        if (!isValidId) return res.sendStatus(404)

        const body = {
            id: rows[0].id,
            shortUrl: rows[0].shortUrl,
            url: rows[0].url
        }

        res.status(200).send(body)

    } catch (error) {
        res.status(500).send(error)
    }
}

export async function redirectByShortUrl(req, res) {
    const { shortUrl } = req.params

    try {
        const { rowCount, rows } = await db.query(`
            SELECT * 
            FROM url
            WHERE "shortUrl" = $1
        `, [shortUrl])

        const shortUrlExists = rowCount > 0

        if (!shortUrlExists) return res.sendStatus(404)

        const visitsCountSum = Number(rows[0].visitCount) + 1

        const url = rows[0].url

        await db.query(`
            UPDATE url
            SET "visitCount" = $1
            WHERE "shortUrl" = $2
        `, [visitsCountSum, shortUrl])

        res.redirect(`${url}`)

    } catch (error) {
        res.status(500).send(error)
    }
}