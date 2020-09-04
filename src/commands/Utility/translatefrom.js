const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const translate = require('translation-google')

module.exports = {
  name: 'translatefrom',
  description: 'Allows you to translate from a specific language to english!',
  args: true,
  usage: '[language] [phrase to translate]',
  guildOnly: false,
  cooldown: 2,
  accessibleBy: 'Everyone',
  category: 'Utility',
  run: async(client, message, args) => {
      let term = args.slice(1).join(" ")
    try {
        translate(term, {from: args[0], to: 'en'}).then(res => {
            message.channel.send(`Translation: \`${res.text}\`. Translated from ${args[0]}`)
        })
    } catch(err) {
        message.channel.send(err.message)
    }
      
    }
};