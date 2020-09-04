const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const translate = require('translation-google')

module.exports = {
  name: 'translate',
  description: 'Allows you to translate any language to english!',
  args: true,
  usage: '[phrase to translate]',
  guildOnly: false,
  cooldown: 2,
  accessibleBy: 'Everyone',
  category: 'Utility',
  run: async(client, message, args) => {
      let term = args.join(" ")

      translate(term, {to: 'en'}).then(res => {
            message.channel.send(`Translation: \`${res.text}\`. Translated from \`${res.from.language.iso}\``)
        }).catch(err => {
            console.log(err)
        })
    }
};