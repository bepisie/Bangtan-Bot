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

async function addBooster(uuid, time) {
    con.query(`INSERT INTO booster (uuid, rob${time}) VALUES ('${uuid}', '${Math.floor(Date.now() / 1000)}')`)
}

async function buyBooster(uuid, time) {
    con.query(`SELECT * FROM booster WHERE uuid = '${uuid}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return addBooster(uuid, time)

        updateBooster(uuid, time)
    })
}

async function updateBooster (uuid, time) {
    con.query(`UPDATE booster SET rob${time} = '${Math.floor(Date.now() / 1000)}' WHERE uuid = '${uuid}'`)
}

async function deleteBooster (uuid, time) {
    con.query(`UPDATE booster SET rob${time} = 'none' WHERE uuid = '${uuid}'`)
}

module.exports = {
    buyBooster: async (uuid, time) => {
        buyBooster(uuid, time)
    },
    getBooster: async (uuid, time) => {
        return new Promise(async (resolve, reject) => {
            con.query(`SELECT * FROM booster WHERE uuid = '${uuid}' AND rob${time} != 'none'`, (err, rows) => {
                if (err) return reject(err)
                if (!rows[0]) return resolve("none")

                let time = rows[0]

                return resolve(time)
            })
        })
    },
    deleteBooster: async (uuid, time) => {
        deleteBooster(uuid, time)
    }
}