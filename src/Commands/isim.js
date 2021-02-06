const { MessageEmbed } = require('discord.js');
const Database = require('../Database/Database');
const roller = require('../../rol-idleri.json');
const config = require('../../config.json');

module.exports = {
    name: "isim",
    aliases: ["ism","i"],
    description: 'İsim değiştirme',
    async execute(message, args) {
        if(message.member.roles.cache.has(roller['sorumlu-rolleri']['kayıt-sorumlusu']) || message.member.hasPermission('ADMINISTRATOR')){
            let üye = message.mentions.users.first()
            if(!üye){
                let s = new MessageEmbed()
                .setDescription(`Lütfen bir üye etiketleyiniz.`)
                .setFooter(message.guild.name);
                return message.channel.send(s).catch(err => console.log(err.message));
            };
            
            let isim = args[1] ? args[1] : "";
            let yaş = args[2] ? args[2] : "";

            üye = message.guild.members.cache.get(üye.id);

            let s = new MessageEmbed()
            .setDescription(`${üye} adlı kullanıcının ismi başarılı bir şekilde ${config.tag + ` ${isim} | ${yaş}`} olarak değişti.`)
            .setFooter(message.guild.name);
            message.channel.send(s).catch(err => console.log(err.message));

            await üye.setNickname(`${config.tag} ${isim} | ${yaş}`).catch(err => console.log(err.message));
        }else{
            let s = new MessageEmbed()
            .setDescription(`Gerekli yetkiye sahip değilsin.`)
            .setFooter(message.guild.name)
            message.channel.send(s).catch(err => console.log(err.message));
        };
    }
}