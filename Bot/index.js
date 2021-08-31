const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const Config = require("./config.json")

client.on("ready", async () => {
    console.log('Bot iniciado')
})

client.on("message", async message => {

    if (message.channel.type === "DM") return

    const args = message.content.slice(Config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    if (message.channel.id === Config.farmers_channel_ID) {
        let m = client.channels.cache.get(Config.channel_ID).send(message.content)
        await setTimeout(() => {
            console.log('Deletando a mensagem')
             m.delete() 
        }, 120000)
    }
})

client.login(Config.token)