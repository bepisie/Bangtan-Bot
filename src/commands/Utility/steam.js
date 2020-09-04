const config = require("../../../config/config.json")
const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js");
const { isUndefined } = require("util");

module.exports = {
    name: 'steam',
    description: 'Search a user on steam!',
    args: true,
    usage: '<ID/CustomURL>',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        try {
            let url = await (await fetch(`https://api.alexflipnote.dev/steam/user/${args[0]}`)).json();
            console.log(url)
            if (!url || url === undefined || isUndefined(url)) {
                message.channel.send("No users found!")
            }
            if (url.profile.privacy === 'Public') {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setTitle(`${url.profile.username}`)
                    .setURL('https://steamcommunity.com/profiles/${url.id.steamid64}')
                    .setThumbnail(url.avatars.avatarfull)
                    .setDescription(url.profile.summary)
                    .addField("**Profile Information:**", `**Status:** ${url.profile.state}\n**Privacy Settings:** ${url.profile.privacy}\n**Location:** ${url.profile.location === null ? 'No location set' : url.profile.location}\n**Time Created:** ${url.profile.timecreated}\n**Real Name:** ${url.profile.realname}`, true)
                    .addField("**VAC Record:**", `**VAC Banned:** ${url.profile.vacbanned === false ? 'Not VAC Banned' : 'Has a VAC Ban on record'}`, true)
                    .addField("**Steam IDs**", `**SteamID64:** ${url.id.steamid64}\n**SteamID32:** ${url.id.steamid32}\n**SteamID3** ${url.id.steamid3}`, true)
                })
            } else {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setTitle(`${url.profile.username}`)
                    .setURL('https://steamcommunity.com/profiles/${url.id.steamid64}')
                    .setThumbnail(url.avatars.avatarmedium)
                    .setDescription(`This user's account privacy is set to private, so the data we display will be limited.`)
                    .addField("**Profile Information:**",`**Privacy Settings:** ${url.profile.privacy}`, true)
                    .addField("**VAC Record:**", `**VAC Banned:** ${url.profile.vacbanned === false ? 'Not VAC Banned' : 'Has a VAC Ban on record'}`, true)
                    .addField("**Steam IDs**", `**SteamID64:** ${url.id.steamid64}\n**SteamID32:** ${url.id.steamid32}\n**SteamID3** ${url.id.steamid3}`, true)
                })
            }
        } catch(err) {
            message.channel.send("No results found!")
        }       
    }
}