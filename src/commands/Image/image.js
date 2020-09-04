const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const google = require("google-images")
const config = require("../../../config/config.json");
const client2 = new google(config.GOOGLE.CSE, config.GOOGLE.API);


module.exports = {
  name: 'image',
  description: 'Search an image from Google Images!',
  args: true,
  usage: '[image search]',
  guildOnly: false,
  cooldown: 30,
  aliases: ['imagesearch'],
  accessibleBy: 'Everyone',
  category: 'Image',
  run: async(client, message, args) => {
      var parts = message.content.split(" ");
      
      var search = parts.slice(1).join(" ");

      if (!args[0]) return ("You need to search something");

      try {
          const results = await client2.search(search);
          const reply = !results.length ?
            "No results" :
            new Discord.MessageAttachment(results[Math.floor(Math.random() * results.length)].url);
          message.channel.send(reply);
        }
        catch (e) {
          console.error(e);
          message.channel.send("Error: Daily limit has been reached. More images will be available tomorrow");
        }
  }
}