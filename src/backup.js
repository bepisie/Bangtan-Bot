const discord = require("discord.js");
const client = new discord.Client();
const client2 = new discord.Client();
const config = require("../config/config.json");
const guildCommandPrefixes = new Map();
const { publish } = require("./publish")
let connection;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.GMAIL.USER,
    pass: config.GMAIL.PASS
  }
});

var mailOptions = {
    from: config.GMAIL.USER,
    to: `${config.GMAIL.MYUSER}, ${config.GMAIL.STAFFUSER}`,
    subject: 'Bangtan Bot Issue!',
    text: 'There was an error with Bangtan Bot! Please check my logs!'
};

(async () => {
    connection = await require('../database/db');
})();

client.on("ready", () => {
    client.user.setActivity("Bot is offline! Sorry for any inconvienience.");
    client.user.setStatus("dnd")

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    /*twilio.messages.create({
        body: "Bangtan Bot has errored! Please log on.",
        from: "+12056192971",
        to: "+17316022250"
    }).then(m => {console.log(m)})

    twilio.messages.create({
        body: "Bangtan Bot has errored! Please log on.",
        from: "+12056192971",
        to: "+447718918385"
    }).then(m => {console.log(m)})*/

    client.guilds.cache.get("728748967449460747").channels.cache.get("739409476821581884").send({
        embed: new discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("OFFLINE!")
        .setDescription("Either we're pushing a new feature or something went wrong! Please bear with us!")
    }).then(msg => {
        publish(msg.id, msg.channel.id)
    })
    client.guilds.cache.get("728748967449460747").members.cache.get("333021520886628352").send("Something went wrong with me! Please log on and fix it!")
    client.guilds.cache.get("728748967449460747").channels.cache.get("738039165266034708").send("<@!333021520886628352> <@!372653142912794626> There has been an issue!")
    client.guilds.cache.forEach(guild => {
        connection.query(
            `SELECT cmdPrefix FROM guildconfigurable WHERE guildId = '${guild.id}'`
        ).then(result => {
            guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
        }).catch(err => console.log(err));
    })
})

client.on("message", async (message) => {
    const PREFIX = message.channel.type !== 'dm' ? guildCommandPrefixes.get(message.guild.id) : '?';
    if (message.content.startsWith(PREFIX)) return message.channel.send({
        embed: new discord.MessageEmbed()
        .setColor("RED")
        .setTitle("OFFLINE!")
        .setDescription("Hey there. Something went wrong and we're offline right now. Sorry for any inconvienience!")
    })
})

client.on("guildCreate", async (guild) => {
    console.log(`Bot added to: ${guild.name} owned by: ${guild.owner.user.tag}`)
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
})

client.on("guildDelete", async (guild) => {
    console.log(`Bot removed from: ${guild.name} owned by: ${guild.owner.user.tag}`)
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

client2.login("NzIyNzAxNTQ3MDgyODc0OTEx.Xum6Qw.mi5Uf131cbsCvik9KU4YZ8CX81M")

client2.on("presenceUpdate", (oldpre, newpre) => {
    if (oldpre.userID === '718458821865111624' && oldpre.status !== newpre.status) {
        client.login(config.DISCORD_BOT.TOKEN)
    }
})

setInterval(function() {
    connection.query(
        `select cmdPrefix from guildconfigurable where guildid = '549685262066778112'`
    ).then(res => {
        console.log(res[0][0].cmdPrefix)
    })
}, 300000)