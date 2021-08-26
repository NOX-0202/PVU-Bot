const Discord = require("discord.js")
const opn = require('open')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const Config = require("./config.json")

client.on("ready", async () => {
    console.log('Bot iniciado')
})

client.on("messageCreate", async message => {

    if (message.channel.type === "DM") return

    const args = message.content.slice(Config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    if (
        message.channel.id === Config.test_channel || 
        message.channel.id === Config.channel_ID
    ) {
        let link = message.content.trim().split('https')
        let link_formated = 'https' + link[1]
        if (link_formated.indexOf("https://") != -1) {
            console.log('abrindo as tabs')
            await opn(link_formated, {
                app: {
                    name: opn.apps.chrome
                }
            })        
        }
    }

    if (message.channel.id === Config.farmers_channel_ID) {
        let m = client.channels.cache.get(Config.channel_ID).send(message.content)
        setTimeout(() => { m.delete() }, 120000)
    }
})

client.login(Config.token)