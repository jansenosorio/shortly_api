import db from '../database/database_connection.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';

export async function signup(req, res) {
    const { name, email, password } = res.locals.users

    const hashedPassword = bcrypt.hashSync(password, 10)

    try {
        await db.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3);`,
            [name, email, hashedPassword])

        res.sendStatus(201)

    } catch (error) {
        res.status(500).send("Internal Error")
    }
}

export async function signIn(req, res) {
    const userId = res.locals.userLogin

    const token = uuid()

    try {
        await db.query(`
            INSERT INTO "userToken" ("userId", "tokenId")
            VALUES ($1, $2)
        `, [userId, token])

        const userToken = { token: token }

        res.status(200).send(userToken)
    } catch (error) {
        return res.status(500).send(error)
    }
}
