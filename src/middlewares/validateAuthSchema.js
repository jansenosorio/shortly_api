import db from "../database/database_connection.js"
import { signupSchema } from '../schema/authSchema.js'

export async function validateSignUpSchema(req, res, next) {

    const users = req.body

    const { error } = signupSchema.validate(users, { abortEarly: false })

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }

    try {
        const { rowCount } = await db.query(`
        SELECT *
        FROM users
        WHERE email = $1
        `, [users.email])

        if (rowCount > 0) return res.status(409)

    } catch (error) {
        res.status(500).send(error)
    }



    res.locals.users = users

    next()

}