const fetch = require("node-fetch")
const discord = require("discord.js")
const config = require("../config/config.json")

module.exports = {
    publish: async (messageid, channelid) => {
        await fetch(
			`https://discord.com/api/v7/channels/${channelid}/messages/${messageid}/crosspost`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bot ${config.DISCORD_BOT.TOKEN}`,
				},
			},
		)
			.then((res) => res.json())
			.then((json) => {
				if (json.code == 50001) {
					console.log('missingPerms');
				}
				else if (json.retry_after !== undefined) {
					console.log('rateLimited');
				}
				else {
				}
			});
    }
}