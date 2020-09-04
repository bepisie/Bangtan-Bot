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

async function genDB() {
    con.query(`CREATE TABLE IF NOT EXISTS cash (uuid varchar(32) NOT NULL PRIMARY KEY, cash int NOT NULL);`)
    con.query(`CREATE TABLE IF NOT EXISTS logs (id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY, type varchar(20) NOT NULL, log varchar(128) NOT NULL, user varchar(32));`)
    console.log(`[Assassin] DB: Tables generated`)
}

async function addWarn(uuid, guildid, reason, warnID, warnedby, time) {
    con.query(`CREATE TABLE IF NOT EXISTS t${guildid} (uuid varchar(32), warnID varchar(50), reason varchar(300), warnedby varchar(100), time varchar(1000));`);

    con.query(`INSERT INTO t${guildid} (uuid, warnID, reason, warnedby, time) VALUES (${uuid}, '${warnID}', '${reason}', '${warnedby}', '${time}');`, (err) => {
        if (err) console.log(err)
    })
}

async function deleteWarn(warnID, guildid) {
    con.query(`DELETE FROM t${guildid} WHERE warnID = '${warnID}';`, (err) => {
        if (err) console.log(err)
    })
}

async function addMember(uuid, cash, time) {
    con.query(`INSERT INTO cash (uuid, cash, time) VALUES ('${uuid}', ${cash}, ${time})`)
}

async function addAfk(uuid, message, guildid) {
    con.query(`INSERT INTO afk (uuid, afkmessage, guildid) VALUES ('${uuid}', ${message}, ${guildid})`)
}

async function removeCash(uuid, cash) {
    con.query(`SELECT * FROM cash WHERE uuid = '${uuid}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return addMember(uuid, 100 - parseInt(cash), Math.floor(Date.now() / 1000))

        let cashFinal = parseInt(rows[0].cash) - parseInt(cash)
        updateCash(uuid, cashFinal)
    })
}

async function addRob(uuid, time) {
    con.query(`UPDATE time SET rob = '${time}' WHERE uuid = '${uuid}';`)
}

async function addCash(uuid, cash) {
    con.query(`SELECT * FROM cash WHERE uuid = '${uuid}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return addMember(uuid, 100 + parseInt(cash), Math.floor(Date.now() / 1000))

        let cashFinal = parseInt(rows[0].cash) + parseInt(cash)
        updateCash(uuid, cashFinal)
    })
}

async function addJob(uuid, job) {
    con.query(`SELECT * FROM cash WHERE uuid = '${uuid}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return addMember(uuid, 100, Math.floor(Date.now() / 1000))

        updateJob(uuid, job)
    })
}

async function removeJob(uuid) {
    con.query(`UPDATE cash SET job = 'none' WHERE uuid = '${uuid}';`)
}

async function updateJob(uuid, job) {
    con.query(`UPDATE cash SET job = '${job}' WHERE uuid = '${uuid}';`)
}

async function updateCash(uuid, cash) {
    con.query(`UPDATE cash SET cash = ${cash} WHERE uuid = '${uuid}';`)
}

async function lastUse(uuid) {
    con.query(`UPDATE cash SET time = ${Math.floor(Date.now() / 1000)} WHERE uuid = '${uuid}'`)
}

async function daily(uuid) {
    con.query(`UPDATE cash SET daily = ${Math.floor(Date.now() / 1000)} WHERE uuid = '${uuid}'`)
}

async function weekly(uuid) {
    con.query(`SELECT * FROM time WHERE uuid = '${uuid}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return;

        con.query(`UPDATE time SET weekly = ${Math.floor(Date.now() / 1000)} WHERE uuid = '${uuid}'`)
    })
}

async function supporter(uuid) {
    con.query(`SELECT * FROM time WHERE uuid = '${uuid}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return;

        con.query(`UPDATE time SET support = ${Math.floor(Date.now() / 1000)} WHERE uuid = '${uuid}'`)
    })
}

async function deleteAfk(uuid) {
    con.query(`DELETE FROM afk WHERE uuid = '${uuid}'`)
}

async function addWork(uuid, time) {
    con.query(`INSERT INTO time (uuid, work) VALUES ('${uuid}', '${time}')`)
}

async function setWork(uuid, time) {
    con.query(`SELECT * FROM time WHERE uuid = '${uuid}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return addWork(uuid, Math.floor(Date.now() / 1000))

        updateWork(uuid, time)
    })
}

async function updateWork(uuid, time) {
    con.query(`UPDATE time SET work = '${time}' WHERE uuid = '${uuid}'`)
}

module.exports = {
    con: con,
    dbConnect: async () => {
        con.getConnection(async (error) => {
            if (!!error) {
                return console.log(`[Assassin] DB: Connection was unsuccessful`)
            } else {
                console.log(`[Assassin] DB: Connected successfully`)
                genDB()
            }
        })
    },
    genMember: async (uuid) => {
        con.query(`SELECT * FROM cash WHERE UUID = '${uuid}'`, (err, rows) => {
            if (err) throw err;
            if (!rows[0]) return addMember(uuid, 100, Math.floor(Date.now() / 1000))
            return
        })
    },
    getCash: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM cash WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0]) {
                    addMember(uuid, 100, Math.floor(Date.now() / 1000))
                    return resolve(parseInt(100))
                }

                let cash = rows[0].cash
                return resolve(parseInt(cash))
            });
          });
    },
    removeCash: async (uuid, amount) => {
        removeCash(uuid, amount)
    },
    addCash: async (uuid, amount) => {
        addCash(uuid, amount)
    },
    addJob: async (uuid, job) => {
        addJob(uuid, job)
    },
    removeJob: async (uuid) => {
        removeJob(uuid)
    },
    genDB: async () => {
        genDB()
    },
    lastUse: async (uuid) => {
        lastUse(uuid)
    },
    daily: async (uuid) => {
        daily(uuid)
    },
    weekly: async (uuid) => {
        weekly(uuid)
    },
    getLast: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM cash WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0]) {
                    addMember(uuid, 100, Math.floor(Date.now() / 1000), 'none')
                    return resolve(parseInt(100))
                }

                let time = rows[0].time
                return resolve(parseInt(time))
            });
          });
    },
    getDaily: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM cash WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0]) {
                    addMember(uuid, 100, Math.floor(Date.now() / 1000), 'none', Math.floor(Date.now() / 1000))
                    return resolve(parseInt(100))
                }

                let daily = rows[0].daily
                return resolve(parseInt(daily))
            });
          });
    },
    getWeekly: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM time WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0] || rows[0] === undefined) {
                    con.query(`INSERT INTO time (uuid, weekly) VALUES ('${uuid}', '${Math.floor(Date.now() / 1000)}')`)
                    return resolve(parseInt(100))
                }

                let daily = rows[0].weekly
                return resolve(parseInt(daily))
            });
          });
    },
    getSupport: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM time WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0] || rows[0] === undefined) {
                    con.query(`INSERT INTO time (uuid, support) VALUES ('${uuid}', '${Math.floor(Date.now() / 1000)}')`)
                    return resolve(parseInt(100))
                }

                let daily = rows[0].support
                return resolve(parseInt(daily))
            });
          });
    },
    supporter: async (uuid) => {
        supporter(uuid)
    },
    addAfk: async (uuid, message, guildid) => {
        addAfk(uuid, message, guildid)
    },
    getAfk: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM afk WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0]) return;

                let afk = [rows[0].afkmessage, rows[0].guildid]
                return resolve(afk)
            })
        })
    },
    deleteAfk: async (uuid) => {
        deleteAfk(uuid)
    },
    setWork: async (uuid, time) => {
        setWork(uuid, time)
    },
    getWork: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM time WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0]) {
                    addWork(uuid, Math.floor(Date.now() / 1000))
                    return resolve(parseInt((Date.now() / 1000) - 22000))
                }

                let work = rows[0].work
                return resolve(work)
            })
        })
    },
    getJob: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM cash WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0]) return;

                let work = rows[0].job
                return resolve(work)
            })
        })
    },
    addWarn: async (uuid, guildid, reason, warnID, warnedby, time) => {
        addWarn(uuid, guildid, reason, warnID, warnedby, time)
    },
    getWarn: async (uuid, guildid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM t${guildid} WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0]) return resolve('no warnings')

                let warnings = rows
                return resolve(warnings)
            })
        })
    },
    deleteWarn: async (warnID, guildid) => {
        deleteWarn(warnID, guildid)
    },
    addRob: async (uuid, time) => {
        addRob(uuid, time)
    },
    getRob: async (uuid) => {
        return new Promise(async (resolve, reject) => {
            await con.query(`SELECT * FROM time WHERE uuid = '${uuid}'`, (err, rows) => {
                if (err) return reject(err);
                if (!rows[0]) {
                    addRob(uuid, Math.floor(Date.now() / 1000))
                    return resolve(parseInt((Date.now() / 1000) - 3000))
                }

                let warnings = rows[0].rob
                return resolve(warnings)
            })
        })
    }
}

