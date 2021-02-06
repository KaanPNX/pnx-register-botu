const { MessageEmbed } = require('discord.js');
const Database = require('../Database/Database');
const roller = require('../../rol-idleri.json');
const config = require('../../config.json');
const ms = require('ms');

module.exports = {
    name: "mute",
    aliases: [],
    description: 'yazılı kanallardan uzaklaştırır.',
    async execute(message, args) {
        if(message.member.roles.cache.has(roller['sorumlu-rolleri']['chat-sorumlusu']) || message.member.hasPermission('ADMINISTRATOR')){
            let üye = message.mentions.users.first();
            if(!üye){
                let s = new MessageEmbed()
                .setDescription(`Lütfen bir tane üye etiketleyip tekrar dener misin.`)
                .setFooter(message.guild.name)
                return message.channel.send(s).catch(err => console.log(err.message));
            };
            let süre = args[1];
            if(!süre){
                let s = new MessageEmbed()
                .setDescription(`Lütfen geçerli bir süre giriniz.`)
                .setFooter(message.guild.name)
                return message.channel.send(s).catch(err => console.log(err.message));
                
            };
            let sebep = args.join(' ').slice(22+süre.length)
            if(!sebep){
                let s = new MessageEmbed()
                .setDescription(`Lütfen sebep belirtin ve tekrar deneyin.`)
                .setFooter(message.guild.name)
                return message.channel.send(s).catch(err => console.log(err.message));
            };
            üye = message.guild.roles.cache.get(üye.id);
            let atıldı = üye.roles.add(roller['diğer-roller']['mute-rolü']).catch(err => console.log(err.message));
            
            if(atıldı){
                let s = new MessageEmbed()
                .setDescription(`${üye} adlı kullanıcı başarılı bir şekilde chat mute atıldı. `)
                .setFooter(message.guild.name)
                message.channel.send(s).catch(err => console.log(err.message));

                setTimeout(async() => {
                    await üye.roles.remove(roller['diğer-roller']['mute-rolü']).catch(err => console.log(err.message));
                    let s = new MessageEmbed()
                    .setDescription(`${üye} adlı kullanıcı başarılı bir şekilde chat mutesi açıldı. `)
                    .setFooter(message.guild.name)
                    message.channel.send(s).catch(err => console.log(err.message));
                },ms(süre));
            };
        
        }else{
            let s = new MessageEmbed()
            .setDescription(`Gerekli yetkiye sahip değilsin.`)
            .setFooter(message.guild.name);
            message.channel.send(s);
        }
    }
}