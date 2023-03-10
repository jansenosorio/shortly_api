import db from "../database/database_connection.js"


export async function getUserInformation(req, res) {
    const token = res.locals.usersInfomations

    try {
        const { rows } = await db.query(`
        SELECT url.id as "urlId", url.url, url."shortUrl", users.id as "userId", users.name, "userToken"."tokenId" as token, url."visitCount"
        FROM url
        JOIN "userToken"
        ON url."tokenId" = "userToken".id
        JOIN users
        ON url."userId" = users.id
        WHERE "userToken"."tokenId" = $1
        `, [token])


        let sumVisits = 0

        rows.map(elm => {
            sumVisits += elm.visitCount
        })

        let secondBody = []

        rows.map((elm, i) => {
            let newArr = {
                id: elm.urlId,
                shortUrl: elm.shortUrl,
                url: elm.url,
                visitCount: elm.visitCount
            }
            secondBody = [...secondBody, newArr]
        })

        const body = {
            id: rows[0].userId,
            name: rows[0].name,
            visitCount: sumVisits,
            shortenedUrls: secondBody
        }

        res.status(200).send(body)

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function getUserRanking(req, res) {

    try {
        const { rows } = await db.query(`
        SELECT users.id, users.name, 
        COUNT(url.id) AS "linksCount", 
        SUM(url."visitCount") AS "visitCount"
        FROM users
        JOIN url ON users.id = url."userId"
        GROUP BY users.id, users.name
        ORDER BY "visitCount" DESC
        LIMIT 10;
    `)

        res.status(200).send(rows)

    } catch (error) {
        res.status(500).send(error)
    }
}