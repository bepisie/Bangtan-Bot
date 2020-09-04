const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const money = require("../../../database/sql")
const games = require("../../../database/games")
let bb = require("../../bangtanbucks")
const boost = require("../../../database/booster")

module.exports = {
    name: 'profile',
    description: 'See your currency profile!',
    args: false,
    usage: '<user>',
    guildOnly: false,
    cooldown: 2,
    accessibleBy: 'Everyone',
    category: 'Currency',
    guildOnly: false,
    run: async(client, message, args) => {
        let user;
        if (args[0]) {
            user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.find(m => m.id === args[0])
        } else {
            user = message.member;
        }

        var roles = "";
        
        user.roles.cache.forEach(function(value, key) {
            roles += value.name + ", ";
        })

        money.getDaily(user.id).then(time => {
            let seconds = 86400 - (Math.floor(Date.now() / 1000) - time);
            let dailytime;
            if (seconds < 0) {
                dailytime = 'Ready!'
            } else {
                if (seconds < 60) {
                    dailytime = (`${seconds} second(s)`);
                } else if (60 < seconds && seconds < 3600) {
                    dailytime = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                } else if (seconds > 3600) {
                    dailytime = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                }
            }
            money.getWeekly(user.id).then(week => {
                let seconds = 604800 - (Math.floor(Date.now() / 1000) - week);
                let weeklytime;
                if (seconds < 0) {
                    weeklytime = 'Ready!'
                } else {
                    if (seconds < 60) {
                        weeklytime = (`${seconds} second(s)`);
                    } else if (60 < seconds && seconds < 3600) {
                        weeklytime = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                    } else if (seconds > 3600 && seconds < 86400) {
                        weeklytime = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                    } else if (seconds > 86400) {
                        weeklytime = (`${Math.floor(seconds / 86400)}d, ${Math.floor((seconds % 86400) / 3600)}h, ${Math.floor(((seconds % 86400) % 3600) / 60)}m, and ${Math.floor(((seconds % 86400) % 3600) % 60)}s`);
                    }
                }
                money.getWork(user.id).then(work => {
                    let seconds = 21600 - (Math.floor(Date.now() / 1000) - work);
                    let worktime;
                    if (seconds < 0) {
                        worktime = 'Ready!'
                    } else {
                        if (seconds < 60) {
                            worktime = (`${seconds} more second(s)`);
                        } else if (60 < seconds && seconds < 3600) {
                            worktime = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                        } else if (seconds > 3600) {
                            worktime = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                        }
                    }
                    money.getSupport(user.id).then(supp => {
                        let seconds = 86400 - (Math.floor(Date.now() / 1000) - supp);
                        let supptime;
                        if (seconds < 0) {
                            supptime = 'Ready!'
                        } else {
                            if (seconds < 60) {
                                supptime = (`${seconds} second(s)`);
                            } else if (60 < seconds && seconds < 3600) {
                                supptime = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                            } else if (seconds > 3600) {
                                supptime = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                            }
                        }
                        money.getJob(user.id).then(job => {
                            job = job.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
                            money.getRob(user.id).then(rob => {
                                let seconds = 1800 - (Math.floor(Date.now() / 1000) - rob);
                                let robtime;
                                if (seconds < 0) {
                                    robtime = 'Ready!'
                                } else {
                                    if (seconds < 60) {
                                        robtime = (`${seconds} more second(s)`);
                                    } else if (60 < seconds && seconds < 3600) {
                                        robtime = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                                    } else if (seconds > 3600) {
                                        robtime = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                                    }
                                } 
                                games.getGame(user.id, 'hilo').then(bool => {
                                    let hilo;
                                    if (bool !== 'false') {
                                        hilo = 'Higher or Lower: Owned'
                                    } else {
                                        hilo = 'Higher or Lower: Not Owned'
                                    }
                                    money.getLast(user.id).then(pass => {
                                        let robable;
                                        if (((Math.floor(Date.now() / 1000) - pass) >= 84000) || isNaN(Math.floor(Date.now() / 1000) - pass)) {
                                            robable = 'Yes'
                                        } else {
                                            robable = 'No'
                                        }
                                        boost.getBooster(user.id, 3).then(boost3 => {
                                            boost.getBooster(user.id, 7).then(boost7 => {
                                                boost.getBooster(user.id, 30).then(boost30 => {
                                                    if (boost3 !== 'none') {
                                                        if ((259200 - (Math.floor(Date.now() / 1000) - boost3.rob3) < 0)) {
                                                            boost.deleteBooster(user.id, 3)
                                                        }
                                                    }
                                                    if (boost7 !== 'none') {
                                                        if ((604800 - (Math.floor(Date.now() / 1000) - boost7.rob7) < 0)) {
                                                            boost.deleteBooster(user.id, 7)
                                                        }
                                                    }
                                                    if (boost30 !== 'none') {
                                                        if ((2592000 - (Math.floor(Date.now() / 1000) - boost30.rob30) < 0)) {
                                                            boost.deleteBooster(user.id, 30)
                                                        }
                                                    }
                                                    let boosttime;
                                                    if (boost3 !== 'none') {
                                                        let seconds = 259200 - (Math.floor(Date.now() / 1000) - boost3.rob3);
                                                        if (seconds < 0) {
                                                            boosttime = 'No booster.'
                                                        } else {
                                                            if (seconds < 60) {
                                                                boosttime = (`${seconds} second(s)`);
                                                            } else if (60 < seconds && seconds < 3600) {
                                                                boosttime = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                                                            } else if (seconds > 3600 && seconds < 86400) {
                                                                boosttime = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                                                            } else if (seconds > 86400) {
                                                                boosttime = (`${Math.floor(seconds / 86400)}d, ${Math.floor((seconds % 86400) / 3600)}h, ${Math.floor(((seconds % 86400) % 3600) / 60)}m, and ${Math.floor(((seconds % 86400) % 3600) % 60)}s`);
                                                            }
                                                        }
                                                    }
                                                    if (boost7 !== 'none') {
                                                        let seconds = 604800 - (Math.floor(Date.now() / 1000) - boost7.rob7);
                                                        if (seconds < 0) {
                                                            boosttime = 'No booster.'
                                                        } else {
                                                            if (seconds < 60) {
                                                                boosttime = (`${seconds} second(s)`);
                                                            } else if (60 < seconds && seconds < 3600) {
                                                                boosttime = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                                                            } else if (seconds > 3600 && seconds < 86400) {
                                                                boosttime = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                                                            } else if (seconds > 86400) {
                                                                boosttime = (`${Math.floor(seconds / 86400)}d, ${Math.floor((seconds % 86400) / 3600)}h, ${Math.floor(((seconds % 86400) % 3600) / 60)}m, and ${Math.floor(((seconds % 86400) % 3600) % 60)}s`);
                                                            }
                                                        }
                                                    }
                                                    if (boost30 !== 'none') {
                                                        let seconds = 2592000 - (Math.floor(Date.now() / 1000) - boost30.rob30);
                                                        if (seconds < 0) {
                                                            boosttime = 'No booster.'
                                                        } else {
                                                            if (seconds < 60) {
                                                                boosttime = (`${seconds} second(s)`);
                                                            } else if (60 < seconds && seconds < 3600) {
                                                                boosttime = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                                                            } else if (seconds > 3600 && seconds < 86400) {
                                                                boosttime = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                                                            } else if (seconds > 86400) {
                                                                boosttime = (`${Math.floor(seconds / 86400)}d, ${Math.floor((seconds % 86400) / 3600)}h, ${Math.floor(((seconds % 86400) % 3600) / 60)}m, and ${Math.floor(((seconds % 86400) % 3600) % 60)}s`);
                                                            }
                                                        }
                                                    }
                                                    if (user.id === '372653142912794626' && message.mentions.members.first()) {
                                                        return message.reply('yo, who wants to know? Bossman likes to keep things quiet.')
                                                    }
                                                    if (boosttime === undefined) boosttime = 'No booster.'
                                                    money.getCash(user.id).then(bal => {
                                                        const userembed = new Discord.MessageEmbed()
                                                        .setTitle(`${user.displayName.toString()}`)
                                                        .setThumbnail(user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                                                        .setColor(user.displayHexColor === "#000000" ? "FFFFFF" : user.displayHexColor)
                                                        .setDescription(`**Display name:**\n${user.displayName}\n
                                                        **Balance:**\n${bal} ${bb.bb}\n
                                                        **Games owned:**\n${hilo}\n
                                                        **Cooldowns:**\nDaily: ${dailytime === undefined ? 'Ready!' : dailytime}\nWeekly: ${weeklytime === undefined ? 'Ready!' : weeklytime}\nWork: ${worktime === undefined ? 'Ready!' : worktime}\nSupporter: ${supptime === undefined ? 'Ready!' : supptime}\nRob: ${robtime === undefined ? 'Ready!' : robtime}\nPassive Mode: ${robable}\n
                                                        **Job:**\n${job}\n
                                                        **Boosters:**\nRob protection: ${boosttime}`)
                                                        .setTimestamp()
                                            
                                                    message.channel.send(userembed)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }) 
    }
}