const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const http = require('https')
const Config = require("./config.json")
require('dotenv').config()

var previousLink = '1'

client.on("ready", async () => {
    console.log('Bot iniciado')
})

client.on("messageCreate", async message => {

    if (message.channel.type === "DM") return

    let args = message.content.slice(Config.prefix.length).trim().split(/ +/g)
    let link = args[args.length - 1]
    
    if (
      link.indexOf('marketplace.plantvsundead') !== -1 &&
      previousLink !== link
    ) {
      previousLink = link
      if (link.indexOf('http') === -1 ) {
        link = 'http' + args[args.length - 1]
      }
      if ( message.channel.id === Config.test_channel || 
        message.channel.id === Config.farmers_channel_ID
      ) {
        client.channels.cache.get(Config.pvu_channel_ID).send(link)
      }
      makeReq(link)  
    }
    
})

function makeReq(link) {

  http.get(`https://link-getter-pvu.herokuapp.com/getLink/${encodeURIComponent(link)}`, resp => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
      console.log(data)
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log('foi');
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  }).end();

}

let token = process.env.DISCORD || Config.token

client.login(token)