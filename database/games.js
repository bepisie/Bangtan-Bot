const { createPool } = require(`mysql`)
const config = require(`../config/config.json`)
const { promises } = require("fs")
const { resolve } = require("path")
const { time } = require("console")

var con = createPool({
    host: '',
    user: config.MYSQL.USER,
    password: config.MYSQL.PASS,
    database: config.MYSQL.NAME,
})

async function addGame(uuid, game) {
    con.query(`INSERT INTO games (uuid, ${game}) VALUES ('${uuid}', 'true')`)
}

async function buyGame(uuid, game) {
    con.query(`SELECT * FROM games WHERE uuid = '${uuid}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return addGame(uuid, game)

        updateGame(uuid, game)
    })
}

async function updateGame (uuid, game) {
    con.query(`UPDATE games SET ${game} = 'true' WHERE uuid = '${uuid}'`)
}

module.exports = {
    buyGame: async (uuid, game) => {
        buyGame(uuid, game)
    },
    getGame: async (uuid, game) => {
        return new Promise(async (resolve, reject) => {
            con.query(`SELECT * FROM games WHERE uuid = '${uuid}' AND ${game} = 'true'`, (err, rows, game) => {
                if (err) return reject(err)
                if (!rows[0]) return resolve("false")

                return resolve(game)
            })
        })
    }
}