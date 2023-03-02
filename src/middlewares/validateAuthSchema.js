import db from "../database/database_connection.js"
import { signupSchema, signInSchema } from '../schema/authSchema.js'
import bcrypt from 'bcrypt'

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


        if (rowCount > 0) return res.sendStatus(409)

    } catch (error) {
        console.log("3")
        console.log(error)
        return res.status(500).send(error)
    }

    res.locals.users = users


    next()


}

export async function validateSignInSchema(req, res, next) {
    const { email, password } = req.body

    const { error } = signInSchema.validate(req.body, { abortEarly: false })

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }

    try {
        const { rowCount, rows } = await db.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email])

        const isEmailExists = rowCount > 0

        if (!isEmailExists) return res.sendStatus(401)

        const isPasswordCorrect = bcrypt.compareSync(password, rows[0].password)

        if (!isPasswordCorrect) return res.sendStatus(401)

        const userId = rows[0].id

        res.locals.userLogin = userId

    } catch (error) {
        return res.status(500).send(error)
    }

    next()
}