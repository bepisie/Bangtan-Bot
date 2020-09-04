const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks');
const { mem } = require("node-os-utils");

module.exports = {
    name: 'work',
    description: `Work to get some ${bb.bb}.`,
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, PREFIX) => {
        let user = message.member;

        money.getWork(user.id).then(time => {
            if ((Math.floor(Date.now() / 1000) - time) > 21600) {
                money.getJob(user.id).then(job => {
                    if (job === 'none') return message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`You need to get a job before you can work!\n Use ${PREFIX}jobs to see what work is available and use ${PREFIX}job [job name] to get yourself a job`)
                    })
                    money.lastUse(message.member.id)
                    money.setWork(message.member.id, Math.floor(Date.now() / 1000))
                    if (job === 'vocal coach') {
                        let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y' ,'z'];
                        let char1 = Math.floor(Math.random() * chars.length)
                        let char2 = Math.floor(Math.random() * chars.length)
                        let char3 = Math.floor(Math.random() * chars.length)
                        let char4 = Math.floor(Math.random() * chars.length)

                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Work!")
                            .setDescription("A few random letters will show up for a split second and then disappear!\n Remember them and send a message with all the letters in order!")
                        })
                        setTimeout(async function() {
                            await message.channel.send(chars[char1]).then(async (msg) => {
                                await msg.delete({timeout: 500})
                            })
                            setTimeout(async function() {
                                await message.channel.send(chars[char2]).then(async (msg) => {
                                    await msg.delete({timeout: 500})
                                })
                                setTimeout(async function() {
                                    await message.channel.send(chars[char3]).then(async (msg) => {
                                        await msg.delete({timeout: 500})
                                    })
                                    setTimeout(async function() {
                                        await message.channel.send(chars[char4]).then(async (msg) => {
                                            await msg.delete({timeout: 500})
                                        })
            
                                        let filter = m => m.author.id === user.id;
                                        message.channel.awaitMessages(filter, {
                                            max: 1,
                                            time:  20000,
                                            errors: ['time']
                                        }).then(async(col) => {
                                            if (col.first().content.toLowerCase().includes(chars[char1]) && col.first().content.toLowerCase().includes(chars[char2]) && col.first().content.toLowerCase().includes(chars[char3]) && col.first().content.toLowerCase().includes(chars[char4])) {
                                                let wage = (Math.floor(Math.random() * 200) + 300)
                                                await money.addCash(user.id, wage)
                                                money.getCash(user.id).then(bal => {
                                                    message.channel.send({
                                                        embed: new MessageEmbed()
                                                        .setColor("GREEN")
                                                        .setTitle("Work")
                                                        .setDescription(`Well done! you earned your wages!\n\nYou earned ${wage} ${bb.bb}!\nYour new balance is ${parseInt(bal) + wage}`)
                                                    })
                                                })
                                            } else {
                                                let wage = Math.floor(Math.random() * 100)
                                                await money.addCash(user.id, wage)
                                                money.getCash(user.id).then(bal => {
                                                    message.channel.send({
                                                        embed: new MessageEmbed()
                                                        .setColor("RED")
                                                        .setTitle("Work")
                                                        .setDescription(`Unlucky. Your boss was feeling generous and still payed you, despite your failure.\n\nYou earned ${wage} ${bb.bb}.\nYour new balance is ${parseInt(bal) + wage}`)
                                                    })
                                                })
                                            }
                                        })
                                    }, 500)
                                }, 500)
                            }, 500)
                        }, 3000)
                    } else if (job === 'stage manager') {
                        let jin = ['https://cdn.discordapp.com/attachments/742345158841991208/742346009941901342/Jin_for_Dispatch__Boy_With_Luv__MV_behind_the_scene_shooting_15_March_2019_01_cropped.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742346076954034246/jin_of_bts.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742346119912095744/Jin_2020_Season_Greeting_Teaser_Image_2.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742346196051558420/10b9d210c4f9a4318eff49ed3d121be4jpg.jpg']
                        let jhope = ['https://cdn.discordapp.com/attachments/742345158841991208/742347511750197308/jung-hoseok-3.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742347578661797908/Hobi-jhope-jung-hoseok-bangtan-boys-E2-99-A5-40307926-500-667.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742347625482944603/large_2.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742347718160285735/ff702ab69e1cf2c95ff7a25ebf8ca0a8.jpg']
                        let suga = ['https://cdn.discordapp.com/attachments/742345158841991208/742346382794555424/00271595.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742346446355038288/Suga-suga-bts-41539141-540-810.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742346541473464330/crop.jpeg', 'https://cdn.discordapp.com/attachments/742345158841991208/742347104705445968/013c34432474c144f235f8d22b075df7.jpg']
                        let rm = ['https://cdn.discordapp.com/attachments/742345158841991208/742345928182071316/1568408801-eeplgcnueaiqaj.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742345928568209438/DkbMjVaWwAA2O7R.jpeg', 'https://cdn.discordapp.com/attachments/742345158841991208/742345928840708166/1_ba2Kl9RqrvVf-z-WbP2S-A.jpeg', 'https://cdn.discordapp.com/attachments/742345158841991208/742345929075720202/f09e239f4548caf8850e170640c6ab27.jpg']
                        let jimin = ['https://cdn.discordapp.com/attachments/742345158841991208/742347824448143370/BTS-Jimin-1.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742348060142731384/IMG_20191027_112002.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742348194071183370/0a8cd4ef72597697d20d56c1fd34d6a8.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742348194322841651/Park_Ji-min_for_Dispatch_White_Day_Special_27_February_2019_03.jpg']
                        let v = ['https://cdn.discordapp.com/attachments/742345158841991208/742348692190920764/b18b66bfe66b6768aab40028b7b83d00-564x600.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742348741373067294/main-qimg-a252513749e40b9fbc8256058d45e9e4.jpeg', 'https://cdn.discordapp.com/attachments/742345158841991208/742348740492263484/2ff121fc053aecf648b450c536dc07ba.png', 'https://cdn.discordapp.com/attachments/742345158841991208/742348741125865472/Kim_Taehyung.jpg']
                        let jk = ['https://cdn.discordapp.com/attachments/742345158841991208/742348769814642688/Jungkook-533x800.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742348770058174474/a306c00795511e7075a0d6083507e4ae.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742348770259239012/original_1.jpg', 'https://cdn.discordapp.com/attachments/742345158841991208/742348781562888202/5cd105985ecde409f984afbd463bfe3c.jpg']
                        let member2;
                        let membername = [];

                        let member = Math.ceil(Math.random() * 7)
                        if (member === 1) {
                            member2 = jin;
                            membername.push('jin');
                        }
                        if (member === 2) {
                            member2 = jhope;
                            membername.push('jhope', 'j-hope');
                        }
                        if (member === 3) {
                            member2 = suga;
                            membername.push('suga');
                        }
                        if (member === 4) {
                            member2 = rm;
                            membername.push('rm', 'rap monster');
                        }
                        if (member === 5) {
                            member2 = jimin;
                            membername.push('jimin');
                        }
                        if (member === 6) {
                            member2 = v;
                            membername.push('v');
                        }
                        if (member === 7) {
                            member2 = jk;
                            membername.push('jk', 'jungkook');
                        }

                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Work!")
                            .setDescription("A picture of a member will appear.\nName the member using their **stage name** (eg RM, JHope)")
                        })

                        setTimeout(function() {
                            message.channel.send({
                                embed: new MessageEmbed()
                                .setTitle("Work")
                                .setDescription("You have 15 seconds")
                                .setImage(member2[Math.floor(Math.random() * member2.length)])
                            })
    
                            let filter = m => m.author.id === user.id;
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time:  20000,
                                errors: ['time']
                            }).then(async(col) => {
                                if (membername.includes(col.first().content.toLowerCase())) {
                                    let wage = (Math.floor(Math.random() * 200) + 300)
                                    await money.addCash(user.id, wage)
                                    money.getCash(user.id).then(bal => {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("GREEN")
                                            .setTitle("Work")
                                            .setDescription(`Well done! you earned your wages!\n\nYou earned ${wage} ${bb.bb}!\nYour new balance is ${parseInt(bal) + wage}`)
                                        })
                                    })
                                } else {
                                    let wage = Math.floor(Math.random() * 100)
                                    await money.addCash(user.id, wage)
                                    money.getCash(user.id).then(bal => {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("RED")
                                            .setTitle("Work")
                                            .setDescription(`Unlucky. Your boss was feeling generous and still payed you, despite your failure.\n\nYou earned ${wage} ${bb.bb}.\nYour new balance is ${parseInt(bal) + wage}`)
                                        })
                                    })
                                }
                            })
                        }, 3000)
                    } else if (job === 'dance instructor') {
                        let fire = ['https://thumbs.gfycat.com/ComposedInferiorArgentineruddyduck.webp', 'https://thumbs.gfycat.com/InsistentImprobableEastsiberianlaika.webp', 'https://thumbs.gfycat.com/ScornfulHeftyAiredale.webp', 'https://thumbs.gfycat.com/UnrealisticUnkemptAxisdeer.webp'];
                        let dna = ['https://thumbs.gfycat.com/EssentialMasculineHuemul-size_restricted.gif', 'https://pa1.narvii.com/6596/179f5bb42a8a205a5d00c90326d5007451f5d9f1_hq.gif', 'https://i.pinimg.com/originals/5a/dc/0d/5adc0d082a2d696056f0e4a5322db5a4.gif', 'https://pa1.narvii.com/6596/16fe0d326f52746972ace35423ad64f5c55d40aa_hq.gif'];
                        let bil = ['https://thumbs.gfycat.com/AbleOldHarpseal-small.gif', 'https://thumbs.gfycat.com/IncomparableUnimportantHyracotherium-size_restricted.gif', 'https://media1.tenor.com/images/9f95cc9e1e33b7f2386d770debf40613/tenor.gif?itemid=3530907', ];
                        let baepsae = ['https://i.pinimg.com/originals/87/64/df/8764df50ef82d5fef1eeb682f4ef2a01.gif', 'https://data.whicdn.com/images/284678551/original.gif', 'https://64.media.tumblr.com/01008ab7b37e9e5504a6d6e1372418c1/tumblr_o83ne1OYL31ujf8qzo1_400.gifv', 'https://66.media.tumblr.com/d79573a19fefaa7d595c1e335c6f4c1f/tumblr_o83n75gSWy1vne1u2o4_400.gif'];
                        let woh = ['https://i.pinimg.com/originals/f7/9d/ca/f79dca3ac0bcb181ff8581a44dc1a1b9.gif', 'https://data.whicdn.com/images/235526714/original.gif', 'https://33.media.tumblr.com/269fb0030f31ddc87fd7c9332532c34c/tumblr_nlb8tm23Vp1tibzaho1_500.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744306595588210708/War_of_hormone_dp.gif'];
                        let blackswan = ['https://cdn.discordapp.com/attachments/685866402460336175/744306685992108223/Black_swan_dp.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744309552253632552/black_swan_dp_2.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744309612781633696/black_swan_dp3.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744309621468037240/black_swan_dp4.gif'];
                        let bwl = ['https://cdn.discordapp.com/attachments/685866402460336175/744306765956513792/BWL_dp.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744308382927814676/bwl_dp4_2.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744308441467846758/bwl_dp2.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744308496232743032/bwl_dp3.gif'];
                        let fl = ['https://cdn.discordapp.com/attachments/685866402460336175/744313253500551228/fake_love_dp_4.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744313229718716426/fake_love_dp_3.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744313227202265239/fake_love_dp_2.gif', 'https://cdn.discordapp.com/attachments/685866402460336175/744306654358798346/Fake_Love_dp.gif'];
                        let member2;
                        let membername = [];

                        let member = Math.ceil(Math.random() * 8)
                        if (member === 1) {
                            member2 = fire;
                            membername.push('fire');
                        }
                        if (member === 2) {
                            member2 = dna;
                            membername.push('dna');
                        }
                        if (member === 3) {
                            member2 = bil;
                            membername.push('bil', 'boy in luv', 'boy in love');
                        }
                        if (member === 4) {
                            member2 = baepsae;
                            membername.push('baepsae');
                        }
                        if (member === 5) {
                            member2 = woh;
                            membername.push('woh', 'war of hormone');
                        }
                        if (member === 6) {
                            member2 = blackswan;
                            membername.push('black swan');
                        }
                        if (member === 7) {
                            member2 = bwl;
                            membername.push('bwl', 'boy with luv', 'boy with love');
                        }
                        if (member === 8) {
                            member2 = fl;
                            membername.push('fl', 'fake love');
                        }

                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Work!")
                            .setDescription("A gif of a dance from a BTS Dance Practice will appear.\nName the song using the **english name**")
                        })
                        setTimeout(function() {
                            message.channel.send({
                                embed: new MessageEmbed()
                                .setTitle("Work")
                                .setImage(member2[Math.floor(Math.random() * member2.length)])
                            })
    
                            let filter = m => m.author.id === user.id;
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time:  20000,
                                errors: ['time']
                            }).then(async(col) => {
                                console.log(col.first().content)
                                if (membername.includes(col.first().content.toLowerCase())) {
                                    let wage = (Math.floor(Math.random() * 200) + 500)
                                    await money.addCash(user.id, wage)
                                    money.getCash(user.id).then(bal => {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("GREEN")
                                            .setTitle("Work")
                                            .setDescription(`Well done! you earned your wages!\n\nYou earned ${wage} ${bb.bb}!\nYour new balance is ${parseInt(bal) + wage}`)
                                        })
                                    })
                                } else {
                                    console.log("si")
                                    let wage = Math.floor(Math.random() * 100)
                                    await money.addCash(user.id, wage)
                                    money.getCash(user.id).then(bal => {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("RED")
                                            .setTitle("Work")
                                            .setDescription(`Unlucky. Your boss was feeling generous and still payed you, despite your failure.\n\nYou earned ${wage} ${bb.bb}.\nYour new balance is ${parseInt(bal) + wage}`)
                                        })
                                    })
                                }
                            })
                        }, 3000)
                    } else if (job === 'video director') {
                        let run = ['https://cdn.discordapp.com/attachments/742777796849303583/743146495028625509/Screenshot_20200812-220025.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146495364038697/Screenshot_20200812-215752.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146495750045837/Screenshot_20200812-215723.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146495993446480/Screenshot_20200812-215730.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146496265814037/Screenshot_20200812-215925.png'];
                        let bst = ['https://cdn.discordapp.com/attachments/742777796849303583/743146751481086092/Screenshot_20200812-212948.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146751808110783/Screenshot_20200812-213016.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146752173146254/Screenshot_20200812-213103.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146752739246152/Screenshot_20200812-212952.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146753146224790/Screenshot_20200812-213011.png'];
                        let daechwita = ['https://cdn.discordapp.com/attachments/742777796849303583/743146918883885066/Screenshot_20200812-214153.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146919152451666/Screenshot_20200812-214114.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146919492190318/Screenshot_20200812-213748.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146919756562582/Screenshot_20200812-214046.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146919999701042/Screenshot_20200812-213959.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743146920272462005/Screenshot_20200812-213929.png'];
                        let danger = ['https://cdn.discordapp.com/attachments/742777796849303583/743147022952955914/Screenshot_20200812-214703.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743147023305408532/Screenshot_20200812-214304.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743147023947006082/Screenshot_20200812-214327.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743147024228155442/Screenshot_20200812-214523.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743147024567763034/Screenshot_20200812-214540.png'];
                        let woh = ['https://cdn.discordapp.com/attachments/742777796849303583/743905560839061694/Screenshot_20200815-002319.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905561375932486/Screenshot_20200815-002346.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905561623658547/Screenshot_20200815-002334.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905562101678140/Screenshot_20200815-002228.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905562588217424/Screenshot_20200815-001952.png'];
                        let bil = ['https://cdn.discordapp.com/attachments/742777796849303583/743905759900991530/Screenshot_20200815-001926.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905760500777041/Screenshot_20200815-001759.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905760945111050/Screenshot_20200815-001649.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905761322729502/Screenshot_20200815-001852.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905761771520122/Screenshot_20200815-001655.png'];
                        let daydream = ['https://cdn.discordapp.com/attachments/742777796849303583/743905905208197120/Screenshot_20200815-001613.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905905434951749/Screenshot_20200815-001556.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905905715707954/Screenshot_20200815-001531.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905905975754853/Screenshot_20200815-001538.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743905906231869521/Screenshot_20200815-001454.png'];
                        let epiphany = ['https://cdn.discordapp.com/attachments/742777796849303583/743907812496769154/Screenshot_20200815-003139.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743907812983177356/Screenshot_20200815-003021.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743907813411258378/Screenshot_20200815-003216.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743907813692014662/Screenshot_20200815-003302.png', 'https://cdn.discordapp.com/attachments/742777796849303583/743907813922963629/Screenshot_20200815-003026.png'];
                        let member2;
                        let membername = [];

                        let member = Math.ceil(Math.random() * 8)
                        if (member === 1) {
                            member2 = run;
                            membername.push('run');
                        }
                        if (member === 2) {
                            member2 = bst;
                            membername.push('bst', 'blood sweat and tears');
                        }
                        if (member === 3) {
                            member2 = daechwita;
                            membername.push('daechwita');
                        }
                        if (member === 4) {
                            member2 = danger;
                            membername.push('danger');
                        }
                        if (member === 5) {
                            member2 = woh;
                            membername.push('woh', 'war of hormone');
                        }
                        if (member === 6) {
                            member2 = bil;
                            membername.push('bil', 'boy in luv', 'boy in love');
                        }
                        if (member === 7) {
                            member2 = daydream;
                            membername.push('daydream');
                        }
                        if (member === 8) {
                            member2 = epiphany;
                            membername.push('epiphany');
                        }

                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Work!")
                            .setDescription("A screenshot from a BTS MV will appear.\nName the song using the **english name**")
                        })
                        setTimeout(function() {
                            message.channel.send({
                                embed: new MessageEmbed()
                                .setTitle("Work")
                                .setImage(member2[Math.floor(Math.random() * member2.length)])
                            })
    
                            let filter = m => m.author.id === user.id;
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time:  20000,
                                errors: ['time']
                            }).then(async(col) => {
                                if (membername.includes(col.first().content.toLowerCase())) {
                                    let wage = (Math.floor(Math.random() * 200) + 500)
                                    await money.addCash(user.id, wage)
                                    money.getCash(user.id).then(bal => {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("GREEN")
                                            .setTitle("Work")
                                            .setDescription(`Well done! you earned your wages!\n\nYou earned ${wage} ${bb.bb}!\nYour new balance is ${parseInt(bal) + wage}`)
                                        })
                                    })
                                } else {
                                    let wage = Math.floor(Math.random() * 100)
                                    await money.addCash(user.id, wage)
                                    money.getCash(user.id).then(bal => {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("RED")
                                            .setTitle("Work")
                                            .setDescription(`Unlucky. Your boss was feeling generous and still payed you, despite your failure.\n\nYou earned ${wage} ${bb.bb}.\nYour new balance is ${parseInt(bal) + wage}`)
                                        })
                                    })
                                }
                            })
                        }, 3000)
                    } else if (job === 'sound designer') {
                        let dna = ['I want it this love\nI want it real love', 'At first sight, I could recognize you\nAs if we were calling for each other', 'Don\'t worry, love\nNone of this is a coincidence', 'This is inevitable, I love us\nWe are the only true lovers']
                        let bst = ['But your wings are like the devil\'s\nThere is a \'bitter\' next to youre \'sweet\'', 'It doesn\'t matter if it hurts\nTie me up so I can\'t escape', 'Kiss me on the lips\nA secret just between the two of us', 'Kill me softly\nClose my eyes with your caress']
                        let fire = ['Live however you want, it’s your life anyway', 'Hey, turn it up\nUntil the dawn is gone', 'All you with a lot of fear, come here\nAll you who are suffering, come here', 'I’m completely drunk, drunk\nI’m swearing on the streets']
                        let bwl = ['Your every picture\nI wanna have under my pillow', 'Now it\'s so high up here\nI want you tuned in to my eyes', 'From the moment I met you, ya, my life was all you, ya', 'Everyone says that I used to be so little and now I became a hero']
                        let nmd = ['Grow up, don\'t just talk, You have a weak mind boy', 'Why are you telling me to go another way? Do well yourself!', 'Boring same day, every day repeats\nAdults and parents tell us the same dream', 'Disobey the hell-like society pardon the dream\nAsk yourself \'bout the profile of your dream']
                        let idol = ['They point fingers at me\nBut I don’t care at all', 'FACE OFF, just like John Woo, ay\nTop star with that spotlight, ay', 'There are hundreds of me’s inside of me\nI’m facing a new me again today', 'I’m so fine wherever I go\nEven if it takes a while sometimes']
                        let blackswan = ['The heart no longer races\nWhen hearing the music play', 'No, just let go of me\nLet my own feet carry me', 'I\'m in my workroom, it\'s my studio\nThe waves go darkly by in a throe', 'My wandering feet held in a rut\nEvery noise and sound\'s been cut'] 
                        let ugh = ['Crackle, that ember burns up again\nSwallows first before it reaches the oil', 'This world, it is taken over by rage\nIt seems that nobody can live without rage', 'Ah, what the hell is there to be upset about being criticized a bit?', 'Look at those people who\'ve grown numb\nExcretion, apathy, you guys are a team']
                        let member2;
                        let membername = [];

                        let member = Math.ceil(Math.random() * 8)
                        if (member === 1) {
                            member2 = dna;
                            membername.push('dna');
                        }
                        if (member === 2) {
                            member2 = bst;
                            membername.push('bst', 'blood sweat and tears');
                        }
                        if (member === 3) {
                            member2 = fire;
                            membername.push('fire');
                        }
                        if (member === 4) {
                            member2 = bwl;
                            membername.push('bwl', 'boy with luv');
                        }
                        if (member === 5) {
                            member2 = nmd;
                            membername.push('nmd', 'no more dream');
                        }
                        if (member === 6) {
                            member2 = idol;
                            membername.push('idol');
                        }
                        if (member === 7) {
                            member2 = blackswan;
                            membername.push('blackswan');
                        }
                        if (member === 8) {
                            member2 = ugh;
                            membername.push('ugh');
                        }

                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Work!")
                            .setDescription("An **english** lyric of a song will appear.\nName the song using the **english name**")
                        })
                        setTimeout(function() {
                            message.channel.send({
                                embed: new MessageEmbed()
                                .setTitle("Work")
                                .setDescription(`${member2[Math.floor(Math.random() * member2.length)]}`)
                            })
    
                            let filter = m => m.author.id === user.id;
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time:  20000,
                                errors: ['time']
                            }).then(async(col) => {
                                if (membername.includes(col.first().content.toLowerCase())) {
                                    let wage = (Math.floor(Math.random() * 200) + 600)
                                    await money.addCash(user.id, wage)
                                    money.getCash(user.id).then(bal => {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("GREEN")
                                            .setTitle("Work")
                                            .setDescription(`Well done! you earned your wages!\n\nYou earned ${wage} ${bb.bb}!\nYour new balance is ${parseInt(bal) + wage}`)
                                        })
                                    })
                                } else {
                                    let wage = Math.floor(Math.random() * 100)
                                    await money.addCash(user.id, wage)
                                    money.getCash(user.id).then(bal => {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("RED")
                                            .setTitle("Work")
                                            .setDescription(`Unlucky. Your boss was feeling generous and still payed you, despite your failure.\n\nYou earned ${wage} ${bb.bb}.\nYour new balance is ${parseInt(bal) + wage}`)
                                        })
                                    })
                                }
                            })
                        }, 3000)
                    }
                })
            } else {
                let seconds = 21600 - (Math.floor(Date.now() / 1000) - time);
                let countdown;
                if (seconds < 60) {
                    countdown = (`${seconds} more second(s)`);
                } else if (60 < seconds && seconds < 3600) {
                    countdown = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                } else if (seconds > 3600) {
                    countdown = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                }
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Woah there!")
                    .setDescription(`You still have to wait ${countdown} before reusing ${PREFIX}work.`)
                })
            }
        })
    }
}