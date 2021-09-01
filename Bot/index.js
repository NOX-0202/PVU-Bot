const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const http = require('http')
const Config = require("./../config.json")

client.on("ready", async () => {
    console.log('Bot iniciado')
})

client.on("messageCreate", async message => {

    if (message.channel.type === "DM") return

    const args = message.content.slice(Config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    if (message.channel.id === Config.pvu_channel_ID) {
        let m = client.channels.cache.get(Config.pvu_channel_ID).send(message.content)
        makereq(message.content)
        await setTimeout(() => {
            console.log('Deletando a mensagem')
             m.delete()
        }, 120000)
    }
})

const makereq = link => {

    http.get(`http://localhost:3000/get-link/${link}`, resp => {
        let data = '';
      
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log('foi');
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

}

client.login(Config.token)