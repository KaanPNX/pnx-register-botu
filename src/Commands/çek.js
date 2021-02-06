const Discord = require('discord.js');

module.exports = {
    name: "çek",
    description: "Erkek Kayıt",
    async execute(message, args,client) {

        let üye = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        
        if(!üye)return;

        let yazanSes = message.member.voice.channel;
        let üyeSes = üye.voice.channel;
    
        if(!yazanSes){
            let s = new Discord.MessageEmbed()
            .setDescription(`Sesli bir kanalda değilsin.`)
            .setFooter(`${message.guild.name}`).setTimestamp()
            return message.channel.send(s);
        }
        
        if(!üyeSes){
            let s = new Discord.MessageEmbed()
            .setDescription(`${üye} sesli bir kanalda değil.`)
            .setFooter(` ${message.guild.name}`).setTimestamp()
            return message.channel.send(s);
        }
        
        let s = new Discord.MessageEmbed()
        .setDescription(`${üye},${message.author} seni ${yazanSes.name} sesli kanalına çekmek istiyor.`)
        .setFooter(`KaanPnX 🖤 ${message.guild.name}`).setTimestamp()
        message.channel.send(s).then(xmsg => {
            xmsg.react("✅");

            const filter = (reaction, user) => user.id == üye.id;
            var collector = xmsg.createReactionCollector(filter, {
              time: 2*60000,
              max:1
            });
            collector.on("collect", (reaction, user) => {
                switch(reaction.emoji.name){
                    case "✅":
                        üye.setVoiceChannel(yazanSes);
                    break;
                }
            });
        });
    }
}