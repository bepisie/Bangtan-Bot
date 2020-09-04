const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
    name: 'djs',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[search term]',
    args: true,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        let search = args.join("%20")
        if (search.includes("#")) search = search.replace("#", "?scrollTo=");

        fetch('https://discord.js.org/#/docs/main/stable/class/'+search, options = {headers : {'User-Agent' : 'Mozilla/5.0'}}).then((response) => response.text()).then(data => {
            console.log(data)
            var results = JSON.parse(data)
            var parsed = html(`${results}`)
            console.log(parsed)
        })
    }
}

function html(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}