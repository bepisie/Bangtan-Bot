const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const translate = require('translation-google')

module.exports = {
  name: 'translateto',
  description: 'Allows you to translate to any language from english!',
  args: true,
  usage: '[language] [phrase to translate]',
  guildOnly: false,
  cooldown: 2,
  accessibleBy: 'Everyone',
  category: 'Utility',
  run: async(client, message, args) => {
        let term = args.slice(1).join(" ")
        try {
            translate(term, {from: 'en', to: args[0]}).then(res => {
                message.channel.send(`Translation: \`${res.text}\`. Translated to ${args[0]}`)
            })
        } catch(err) {
            message.channel.send(err.message)
        }
    }
};