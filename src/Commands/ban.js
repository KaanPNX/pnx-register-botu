const { MessageEmbed } = require('discord.js');
const Database = require('../Database/Database');
const config = require('../../config.json');
const rol_idleri = require('../../rol-idleri.json');

module.exports = {
    name: "ban",
    aliases: ["yasakla"],
    description: 'YASAKLAMA',
    async execute(message, args) {
        if(message.member.roles.cache.has(rol_idleri['sorumlu-rolleri']['ban-sorumlusu']) || message.member.hasPermission('ADMINISTRATOR')){

            let üye = message.mentions.users.first();
            if(!üye){
                let s = new MessageEmbed()
                .setDescription(`Lütfen bir üye etiketleyip tekrar deneyin.`)
                .setFooter(message.guild.name)
                return message.channel.send(s).catch(err => console.log(err.message));
            };

            let sebep = args.join(' ').slice(22);
            if(!sebep){
                let s = new MessageEmbed()
                .setDescription(`Lütfen bir sebep belirtin.`)
                .setFooter(message.guild.name)
                return message.channel.send(s).catch(err => console.log(err.message));
            };
             üye = message.guild.members.cache.get(üye.id);

             if(message.member.roles.highest.position < üye.roles.highest.position){
                let s = new MessageEmbed()
                .setDescription(`Etiketlediğin kullanıcının rolleri senin rollerinden yukarıda.`)
                .setFooter(message.guild.name);
                return message.channel.send(s).catch(err => console.log(err.message));
             };

             let banlandı = üye.ban({reason:sebep}).catch(err => message.channel.send(`Hata: ${err.message}`));

             if(!banlandı){
                let s = new MessageEmbed()
                .setDescription(`${üye} adlı kullanıcı ${sebep} nedeniyle sunucudan uzaklaştırlıdı.`)
                .setFooter(message.guild.name)
                message.channel.send(s).catch(err => console.log(err.message));

                let log_kanalı = client.channels.get(config.log_kanalı);
                if(!log_kanalı)return;
                log_kanalı.send(s);
             };

        }else{
            let s = new MessageEmbed()
            .setDescription(`Gerekli yetkiye sahip değilsin.`)
            .setFooter(message.guild.name)
            return message.channel.send(s).catch(err => console.log(err.message));
        }
    }
};