const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');

  client.commands = new Discord.Collection();
  
  fs.readdir("./src/Commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./src/Commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`${commandName}`);
      client.commands.set(commandName, props);
    });
  });
  
client.on('message',async(message) => {
    if (message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;
  
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
  
    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command)return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
    }
});

client.on('guildMemberAdd',(member) => {
        const moment = require('moment');
        require('moment-duration-format');
        const roller = require('./rol-idleri.json');
        moment.locale('tr');

        var x = moment(member.user.createdAt).add(15, "days").fromNow();
        var user = member.user;
        x = x.replace("birkaç saniye önce", " ");

        if (!x.includes("önce") || x.includes("sonra") || x == " ") {
            member.roles.add(roller['diğer-roller']['cezalı-rolü']);
        }else{
            member.roles.add(roller.roller['kayıtsız-rolü']);
        }
});

client.on('guildMemberAdd',async(member) => {
        const roller = require('./rol-idleri.json');
        let kanal = client.channels.get(roller.logKanalları['kayıt-kanalı']);

        kanal.send(`
${member},${member.guild.name} Sunucusuna hoş geldin

Seninle birlikte \`${member.guild.memberCount}\` kişi olduk
        
Kayıdının yapılması için Sesli Kanallara Girip Ses Teyit Vermen Gerekiyor

Sesli kanallarda seninle ${member.guild.roles.get(roller['sorumlu-rolleri']['kayıt-sorumlusu'])} rolündeki yetkililerimiz ilgilenecektir.

        `)
    
});

client.on("userUpdate",async(old,nev) => {
    const roller = require('./rol-idleri.json');
    const config = require('./config.json');
    
    if(old.username !== nev.username) {
    if(!nev.username.includes(config.tag) && client.guilds.cache.get(config['sunucu-id']).members.cache.get(nev.id).roles.cache.has(roller['diğer-roller']['family-rolü'])) {  
     
      await client.guilds.cache.get(roller.sunucuID).members.cache.get(nev.id).roles.remove(roller['diğer-roller']['family-rolü']) 

  } 

  //////////////////////////////////////////////////////////////TAG VERİLDİ////////////////////////////////////////////////////////////////////
  
       if(nev.username.includes(config.tag) && !client.guilds.cache.get(roller.sunucuID).members.cache.get(nev.id).roles.cache.has(roller['diğer-roller']['family-rolü'])) {
         await client.guilds.cache.get(roller.sunucuID).members.cache.get(nev.id).roles.add(roller['diğer-roller']['family-rolü']) 
        
       }
      }  
});

client.on('message',async(message) => {
  const discordAdblockPlus = require('discord.js-adblock');
  const roller = require('./rol-idleri.json');

    discordAdblockPlus.options({
        maxwarnings: 3,
        whitelistlinks: [],
        bot_block: true
    });
    const adDetected = await discordAdblockPlus.checkAdMessage(message); 
    if(adDetected) {
       await message.member.roles.add(roller['diğer-roller']['mute-rolü']).catch(err => console.log(err.message));
    };
});


client.login(config.token); 

//eğer glitch üzerine cloneladıysanız config.token yerine process.env.TOKEN yazın
//.env dosyasına gidip TOKEN=<TOKENİNİZ> şeklinde tokeninizi yerleştirebilirsiniz
//bu şekilde sunucunuzun patlama ihtimalini düşürmüş olursunuz :)