const discord = require("discord.js")

module.exports = {
    name: 'comfort',
    description: 'Sends a message of comfort to yourself or someone else!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        var roasts = ["You're not alone. I'm here for you.", "You're feelings matter. Don't throw them away.", "Take your time. There is no need to rush", "The people in this server are always here to talk to you.", "Don't worry, everything will be okay.", "How are you feeling today? You can tell me.", "I'm glad that you're in my life.", "I'm very happy to be friends with you", "Thank you for your existence.", "I love you and I care about you. Don't ever give up", "Be the one who never gives up on their dreams", "Stay strong and never look back", "Do what you can, where you are, with what you have.", "The two most important days in your life are the day you are born and the day you find out why.", "Don't quit. Suffer now and live the rest of your life as a champion.", "A person who never made a mistake never tried anything new. Don't be afraid to make mistakes.", "You are not a product of your circumstances. You are a product of your decisions.", "The secret to success is constancy of purpose.", "Go confidently in the direction of your dreams. Live the life you have imagined.", "Life can get hard sometimes but remember, there's always light at the end of a tunnel.", "Please be happy.", "Don't say you're worthless. You're worth every minute in the universe.", "Noone is ugly, we're just born in a judgemental society.", "Find the little happy things in life.", "I love you.", "Take our hands and never let go. This server will always be with you", "You never walk alone. Remember that.", "Follow your dreams and never let go.", "You're an amazing person.", "You're always going to be my best friend.", "You're doing an amazing job. Keep it up!", "There will always be ups and downs in a relationship and in life too. Just go through with them and know, that everything will sort out in the end.", "I hope you're having a great day!", "Good luck for whatever's ahead in your life and make sure you never give up!", "I know it's tough but we'll go through life together and we'll achieve our dreams. All we need to do is believe.", "Believe in yourself.", "I have faith in you. Continue what you did and achieve what you want.", "I have a lot of faith in you. Keep it up!", "I hope you're doing okay.", "Suicide is a permanent solution to a temporary problem. Stay with us.", "I wish the best for you.", "You're beautiful", "Your body is perfect. Don't hate yourself.", "Stay positive. All the hardest and darkest times have an ending. It won't stay forever.", "Please don't push people away who want to help you. We love you and care for you. We just want to help.", "You're the best person I ever met in my life. Thank you for being here.", "You're voice is very sweet. Please don't hate it.", "You look amazing.", "You're doing an amazing job.", "I can't express how much you mean to me."]
        
        if (message.channel.type === 'dm') return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(roasts[Math.floor(Math.random() * roasts.length)])
        });
        
        if(message.mentions.members.first() != null) {
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.mentions.members.first().toString()}, ${roasts[Math.floor(Math.random() * roasts.length)]}`)
            });
        } else {
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(roasts[Math.floor(Math.random() * roasts.length)])
            });
        }
    }
}