const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');
const discord = require('discord.js')
const genius = require('genius-lyrics-api')
const config = require('../../../config/config.json');
const { isNull, isNullOrUndefined } = require("util");

module.exports = {
    name: 'lyrics',
    description: 'Posts a song\s lyrics!',
    args: false,
    guildOnly: true,
    cooldown: 0,
    aliases: ['l'],
    accessibleBy: 'Everyone',
    category: 'Music',
    run: async(client, message, args, PREFIX) => {
        var song = args.join(" ")

        const options = {
            apiKey: config.GENIUS.TOKEN,
            title: song,
            artist: '',
            optimizeQuery: false
        };

        genius.getLyrics(options).then(lyrics => {
            if(isNullOrUndefined(lyrics)) return message.channel.send("No results found.")
            let i = 0;
            let strings = lyrics.SplitIntoParts(2000)

            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(strings[0])
            })

            strings.shift()

            strings.forEach(lyrics2 => {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(strings[i])
                    .setFooter(`Requested by ${message.member.nickname ? message.member.nickname : message.author.username}`)
                })
                i = i + 1;
            });
        })
    }
}

String.prototype.SplitIntoParts = function(partLength)
{
	var list = [];
	if (this !== "" && partLength > 0)
	{
		for (var i = 0; i < this.length; i += partLength)
		{
			list.push(this.substr(i, Math.min(partLength, this.length)));
		}
	}
	return list;
}