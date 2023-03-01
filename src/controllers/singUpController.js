import db from '../database/database_connection.js'
import bcrypt from 'bcrypt'

export async function signup(req, res) {
    const { name, email, password } = res.locals.users

    const hashedPassword = bcrypt.hashSync(password, 10)

    try {

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashedPassword])

        res.sendStatus(201)

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error")
    }
}