const discord = require("discord.js");
const client = new discord.Client();
const config = require("../config/config.json");
const fs = require('fs').promises;
const path = require('path');
const keyv = require('keyv');
const sqlite = require("@keyv/sqlite");
const { ErelaClient } = require("erela.js");
const { Utils } = require("erela.js");
const { GiveawaysManager } = require('discord-giveaways');
const { addCash } = require("../database/sql");
const dbl = require('dblapi.js');
const { publish } = require("./publish")
const money = require("../database/sql");
/* const twitter = require('twit');
const twitterclient = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  });

const stream = twitterclient.stream('statuses/filter', {
    follow: '3897006759',
});
*/
const DBL = new dbl(config.DBL.TOKEN, client) 
const DBL2 = new dbl(config.DBL.TOKEN, { webhookPort: 5000, webhookAuth: 'password' })
let connection;
client.snipes = new discord.Collection();
client.commands = new discord.Collection();
const cooldowns = new discord.Collection();
client.login(config.DISCORD_BOT.TOKEN)
client.db = new keyv('sqlite://./database.sqlite');
client.config = require('../config/config.json')
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "✅"
    }
});
client.getID = function(mention) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;// mention.slice(2, -1)
    const id = matches[1];
    return id;
}

const guildCommandPrefixes = new Map();
const announcementChan = new Map();
const leaveChan = new Map();
const tweetChan = new Map();
const inviteCensor = new Map();
const autoannounce = new Map();

(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) {
            registerCommands(path.join(dir, file));
        } else {
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule, cmdName.name, cmdName.args, cmdName.usage, cmdName.guildOnly, cmdName.cooldown, cmdName.aliases, cmdName.accessibleBy, cmdName.permRequirement);
            }
        }
    }
})();

const nodes = [
    {
        host: config.ERELA.HOST,
        port: config.ERELA.PORT,
        password: config.ERELA.PASSWORD,
    }
]

DBL.on('posted', () => {
  console.log('Server count posted!');
})

client.once("ready", () =>{
    client.music = new ErelaClient(client, nodes);
    client.music.on("nodeConnect", node => console.log("New Node Connected"));
    client.music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
    client.music.on("trackStart", (player, track) => player.textChannel.send({
        embed: new discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Now playing: ${track.title}`)
    }));
    client.music.on("queueEnd", player => {
        player.textChannel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("Queue has ended!")
        })
        client.music.players.destroy(player.guild.id);
    });
})

client.on('ready', () => {
    console.log("Bot is ready");
    client.user.setStatus("Online")
    client.guilds.cache.get("728748967449460747").channels.cache.get("739409476821581884").send({
        embed: new discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Online!")
        .setDescription("We're back online! Sorry for any downtime.")
    }).then(msg => {
        publish(msg.id, msg.channel.id)
    })
    var array = [];
    var array2 = [];
    let i;
    let servers = client.guilds.cache;
    i = servers.reduce((acc, guild) => acc + guild.memberCount, 0)
    for (const guild of servers.values())
    {
        array.push(guild.name)
    }
    let servers22 = array.join("\n")
    console.log(servers22)
    client.user.setActivity(`${i} members in ${client.guilds.cache.size} servers!`, { type: 'WATCHING' })
    client.guilds.cache.forEach(async (guild) => {
        connection.query(
            `SELECT cmdPrefix FROM guildconfigurable WHERE guildId = '${guild.id}'`
        ).then(async (result) => {
            guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
            console.log(guild.name);
            console.log(guild.id)
            console.log(guildCommandPrefixes.get(guild.id));
        }).catch(err => console.log(err));
    })
    client.guilds.cache.forEach(guild => {
        connection.query(
            `SELECT announcementChannel FROM guildconfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            if (parseInt(result) == NaN) {
                console.log(`${guild.id} is undefined`)
            }
            announcementChan.set(guild.id, result[0][0].announcementChannel);
        }).catch(err => console.log(err));
    })
    client.guilds.cache.forEach(guild => {
        connection.query(
            `SELECT leaveChannel FROM guildconfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            leaveChan.set(guild.id, result[0][0].leaveChannel);
        }).catch(err => console.log(err));
    })
    client.guilds.cache.forEach(guild => {
        connection.query(
            `SELECT tweetchannel FROM guildconfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            tweetChan.set(guild.id, result[0][0].tweetchannel);
        }).catch(err => console.log(err));
    })
    client.guilds.cache.forEach(guild => {
        connection.query(
            `SELECT inviteCensor FROM guildconfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            inviteCensor.set(guild.id, result[0][0].inviteCensor);
        }).catch(err => console.log(err));
    })
    client.guilds.cache.forEach(guild => {
        connection.query(
            `SELECT autoannounce FROM guildconfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            autoannounce.set(guild.id, result[0][0].autoannounce);
        }).catch(err => console.log(err));
    })
    console.log(`The bot is in: ${client.guilds.cache.size} servers!`)
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    let user = message.author.id;
    const PREFIX = message.channel.type !== 'dm' ? guildCommandPrefixes.get(message.guild.id) : '?';
    let cmdArgs = message.content.substring(message.content.indexOf(PREFIX)+PREFIX.length).split(new RegExp(/\s+/));
    let cmdName = cmdArgs.shift().toLowerCase();

    if (cmdName.includes(PREFIX) || message.content === PREFIX) return;
    var ping = Date.now() - message.createdTimestamp + " ms";
    if (message.content.startsWith("<@!718458821865111624>") && !cmdArgs[0] && !message.content.includes('@everyone') && !message.content.includes('@here')) return message.channel.send({
        embed: new discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Hey there! Use \`${PREFIX}help\` to find out what you can do with Bangtan Bot!`)
        .setTitle("Bangtan Bot")
        .setThumbnail(client.user.displayAvatarURL())
    })

    if (message.channel.type === 'news' && autoannounce.get(message.guild.id) === 'yes') {
        publish(message.id, message.channel.id)
    }

    if (message.channel.type === 'text') {
        if (inviteCensor.get(message.guild.id) === 'true') {
            if (!message.member.hasPermission("KICK_MEMBERS")) {
                if (message.content.includes("https://www.discord.com/") || message.content.includes("https://discord.gg")) {
                    message.delete()
                    return message.channel.send({
                        embed: new discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription("You aren't allowed to send invites in this server!")
                    })
                }
            }
        }
    } 

    if(!message.content.toLowerCase().startsWith(PREFIX)) return;
    if(cmdName.startsWith("?")) {
        cmdName = cmdName.substring(1)
    }

    const command = client.commands.get(cmdName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if (!command && message.content !== '?bangtanbottestping') return message.channel.send("No command or alias found!");

    if (message.content !== '?bangtanbottestping'){
        if (command.guildOnly && message.channel.type === 'dm') return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`You cannot use ${PREFIX}${command.name} in DMs. Please try again in a server!`)
        })
    }

    const anChan = message.channel.type !== 'dm' ? announcementChan.get(message.guild.id) : "";
    if (message.content !== '?bangtanbottestping') {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new discord.Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 0) * 1000;
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                if (timeLeft.toFixed(0) < 60) {
                    return message.reply(`Please wait ${timeLeft.toFixed(0)} more second(s) before reusing the \`${command.name}\` command.`);
                } else if (60 < timeLeft.toFixed(0) && timeLeft.toFixed(0) < 3600) {
                    return message.reply(`Please wait ${Math.floor(timeLeft.toFixed(0) / 60)}m and ${Math.floor(timeLeft.toFixed(0) % 60)}s before reusing the \`${command.name}\` command.`);
                } else if (timeLeft.toFixed(0) > 3600) {
                    return message.reply(`Please wait ${Math.floor(timeLeft.toFixed(0) / 3600)}h, ${Math.floor((timeLeft.toFixed(0) % 3600) / 60)}m, and ${Math.floor((timeLeft.toFixed(0) % 3600) % 60)}s before reusing the \`${command.name}\` command.`);
                }
                
            }
        } else {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
    }

    try {
        if (message.content === '?bangtanbottestping') return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription("Your ping is " + `${ping}`)
        });
        if (command.accessibleBy === 'Owner') {
            if (message.author.id !== '372653142912794626' && message.author.id !== '333021520886628352') return message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription('You cannot use that command')
            })
        }

        if (command.accessibleBy === 'Moderators') {
            if (!message.member.hasPermission(`${command.permRequirement}`) && message.author.id !== '372653142912794626') return message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You cannot use that command! You need the ${command.permRequirement} permission to use this command!`)
            })
        }

        if (command.args && !cmdArgs.length) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`This command requires arguments! Please use \`?cmd [command]\` to check what arguments you need!`)
        });
        try {
            command.run(client, message, cmdArgs, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes, command, cmdName, tweetChan, inviteCensor, autoannounce);
        } catch(err) {
            message.channel.send("There was an error, please try again later!")
            console.log(`Error with ${command.name}: ${err}\nMessage: ${message.content}`)
        }
        
    } catch(err) {
        console.log(err)
    }
});

client.on("guildCreate", async (guild) => {
    let i;
    let servers = client.guilds.cache;
    i = servers.reduce((acc, guild) => acc + guild.memberCount, 0)
    client.user.setActivity(`${i} members in ${client.guilds.cache.size} servers!`, { type: 'WATCHING' })
    client.guilds.cache.get('728748967449460747').channels.cache.get("740228494679867522").send(`Bot added to: ${guild.name} owned by: ${guild.owner.user.tag}`)
    try {
        await connection.query(
            `INSERT INTO guilds VALUES('${guild.id}')`
        );
        await connection.query(
            `INSERT INTO guildconfigurable (guildId) VALUES ('${guild.id}')`
        );
        if (guild.members.cache.find(m => m.id === "155149108183695360")) {
            try {
                connection.query(
                    `UPDATE guildconfigurable SET cmdPrefix = 'b?' WHERE guildId = '${guild.id}'`
                )
                guild.members.cache.find(m => m.id === '718458821865111624').setNickname(`(b?) Bangtan Bot`)
            } catch(err) {console.log(err)} 
        } else {
            guild.members.cache.find(m => m.id === '718458821865111624').setNickname(`(?) Bangtan Bot`)
        }
        client.guilds.cache.forEach(guild => {
            connection.query(
                `SELECT cmdPrefix FROM guildconfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
            }).catch(err => {
                console.log(err)
            });
        })
    } catch(err) {
        console.log(err)
        guild.channels.cache.first().send("Something went wrong! Please contact @ItIsShadow#0001")
    };
});

(async () => {
    connection = await require('../database/db');
    await client.login(config.DISCORD_BOT.TOKEN);
    console.log("bot is online");
})();

client.on("guildMemberRemove", member => {

    var channelleave = leaveChan.get(member.guild.id);
    var channel2 = member.guild.channels.cache.find(c => c.id === channelleave);
    if (!channel2) return;
    if (!channel2.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return member.guild.owner.send({
        embed: new discord.MessageEmbed()
        .setColor("RED")
        .setDescription("I need the permission SEND_MESSAGES in your leaves channel to be able to send a message when someone leaves! Please fix this or use `?removeleavechannel`")
    })
    if (member.guild.channels.cache.find(c => c.id === channelleave)) {
       channel2.send(`${member.user.tag} has left the server!`);
    } else return;

    /*money.getWarn(member.id, member.guild.id).then(warns => {
        warns.forEach(warn => {
            money.deleteWarn(warn.warnID)
        })
    })*/
});

client.on("guildDelete", async (guild) => {
    let i;
    let servers = client.guilds.cache;
    i = servers.reduce((acc, guild) => acc + guild.memberCount, 0)
    client.user.setActivity(`${i} members in ${client.guilds.cache.size} servers!`, { type: 'WATCHING' })
    client.guilds.cache.get('728748967449460747').channels.cache.get("740228494679867522").send(`Bot removed from: ${guild.name} owned by: ${guild.owner.user.tag}`)
    try {
        await connection.query(
            `DELETE FROM guilds WHERE guildId = '${guild.id}'`
        );
        await connection.query(
            `DELETE FROM guildconfigurable WHERE guildId = '${guild.id}'`
        );
        client.guilds.cache.forEach(guild => {
            connection.query(
                `SELECT cmdPrefix FROM guildconfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
            }).catch(err => console.log(err));
        })
    } catch(err) {
        console.log(err)
    };
})

client.on("messageDelete", async (message) => {
    if (message.author.bot) return;
    const snipes = message.client.snipes.get(message.channel.id) || [];
    snipes.unshift({
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        date: new Date().toLocaleString("en-GB", { dataStyle: "full", timeStyle: "short" })
    })
    snipes.splice(10);
    message.client.snipes.set(message.channel.id, snipes)
})

client.on("guildMemberAdd", async (member) => {

    if (member.guild.id === '549685262066778112') {
        member.roles.add('701160098759966730')
        member.guild.channels.cache.find(c => c.name === 'bot-testing').send(`${member.user.tag} has joined the server!`);
    }

    if (member.guild.id === '728748967449460747') {
        member.roles.add('728934316494815302');
    }

    if (member.guild.id === '616757221253972057') {
        member.roles.add('711596786040438846')
    }
})

process.on("unhandledRejection", err => {
    console.log(err)
})

setInterval(function() {
    connection.query(
        `select cmdPrefix from guildconfigurable where guildid = '549685262066778112'`
    ).then(res => {
        console.log(res[0][0].cmdPrefix)
    })
}, 300000)

DBL2.webhook.on("vote", vote => {
    addCash(vote.user, 500);
    let user;
    client.guilds.cache.forEach(guild => {
        let usersearch = guild.members.cache.get(vote.user)
        if(usersearch) user = usersearch.user.username;
    })
    client.guilds.cache.get("728748967449460747").channels.cache.get("737430787787587667").send(`User: ${user} (ID: ${vote.user}) just voted!`);
})

/* stream.on('tweet', tweet => {
  const twitterMessage = `${tweet.user.name} (@${tweet.user.screen_name}) tweeted this: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
  client.guilds.cache.forEach(guild => {
    var channeltweet = tweetChan.get(guild.id)
    var channel2 = guild.channels.cache.find(c => c.id === channelleave);
    if (!channel2) return;
    if (!channel2.permissionsFor(guild.me).has('SEND_MESSAGES')) return guild.owner.send({
        embed: new discord.MessageEmbed()
        .setColor("RED")
        .setDescription("I need the permission SEND_MESSAGES in your tweets channel to be able to send a message when BTS tweets! Please fix this or use `?removetweetchannel`")
    })
    if (guild.channels.cache.find(c => c.id === channelleave)) {
        channel2.send(twitterMessage);
     } else return;
  })
  return false;
}); */