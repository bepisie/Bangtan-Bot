const urban = require("urban");
const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../../colours.json");
const { stripIndents } = require("common-tags");

module.exports = {
    name: 'urban',
    description: 'Search for a word on Urban Dictionary! [NSFW Channels only!]',
    args: true,
    usage: '[search term]',
    guildOnly: false,
    cooldown: 5,
    aliases: ['urbandictionary', 'ud', 'urbansearch'],
    accessibleBy: 'Everyone',
    category: 'Nsfw',
    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send("You need to give me something to search!");

        if (message.channel.type != 'dm') {
            if(!message.channel.nsfw && message.guild.id !== '549685262066778112' && message.guild.id !== '616757221253972057' && message.guild.id !== '722880379849277471') return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription("This command can only be used in NSFW channels!")
            })
        }
        
        let image = "https://media-exp1.licdn.com/dms/image/C560BAQFe1nim1QolmA/company-logo_200_200/0?e=2159024400&v=beta&t=LmbAikTV5gd7_tERzN6deJ8RQZWGevC5ZofA1bcEWK4";
        let search = urban(args.join(" "))
            try {
                search.first(res => {
                    if(!res) return message.channel.send("No results found for this topic, sorry!");
                    let { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;


                        let strings = definition.SplitIntoParts(2000)
                        

                        let embed = new MessageEmbed()
                            .setColor(cyan)
                            .setAuthor(`Urban Dictionary | ${word}`, image)
                            .setThumbnail(image)
                            .setDescription(`**Definition:**\n${strings[0] || "No definition"}
                            **Example:** ${example || "No Example"}
                            **Upvote:** ${thumbs_up || 0}
                            **Downvote:** ${thumbs_down || 0}
                            **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
                            .setTimestamp()
                            .setFooter(`Written by ${author || "unknown"}`);

                        message.channel.send(embed)

                        strings.shift()

                        let i = 0;

                        strings.forEach(l => {
                            message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RANDOM")
                                .setDescription(strings[i])
                                .setFooter(`Requested by ${message.member.nickname ? message.member.nickname : message.author.username}`)
                            })
                            i = i + 1;
                        });
                })
            } catch(e) {
                console.log(e)
                return message.channel.send("looks like i've broken! Try again")
            }
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