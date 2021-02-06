const { MessageEmbed } = require('discord.js');
const Database = require('../Database/Database');
const roller = require('../../rol-idleri.json');
const config = require('../../config.json');

module.exports = {
    name: "kadın",
    aliases: ["k"],
    description: 'kadın',
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
            let kadın = message.guild.roles.cache.get(roller['kayıt-rolleri']['kadın-rolü'])
            let kadın2 = message.guild.roles.cache.get(roller['kayıt-rolleri']['kadın2-rolü'])
            let kadın3 = message.guild.roles.cache.get(roller['kayıt-rolleri']['kadın3-rolü'])
            
            if(!kadın)console.log();
            if(!kadın2)console.log();
            if(!kadın3)console.log();

            let kayıtsız = message.guild.roles.cache.get(roller['kayıt-rolleri']['kayıtsız-rolü'])
            let kayıtsız2 = message.guild.roles.cache.get(roller['kayıt-rolleri']['kayıtsız2-rolü'])
            let kayıtsız3 = message.guild.roles.cache.get(roller['kayıt-rolleri']['kayıtsız3-rolü'])
            
            if(!kayıtsız)console.log();
            if(!kayıtsız2)console.log();
            if(!kayıtsız3)console.log();

            let s = new MessageEmbed()
            .setDescription(`${üye} adlı kullanıcı başarılı bir şekilde erkek olarak kayıt oldu.`)
            .setFooter(message.guild.name);
            message.channel.send(s).catch(err => console.log(err.message));

            await üye.roles.add([kadın,kadın2,kadın3]).catch(err => console.log(err.message));
            await üye.roles.remove([kayıtsız,kayıtsız2,kayıtsız3]).catch(err => console.log(err.message));
            await üye.setNickname(`${config.tag} ${isim} | ${yaş}`).catch(err => console.log(err.message));
            const db = new Database("./Servers/" + message.guild.id, "Teyit");
            const db2 = new Database("./Servers/" + message.guild.id, "KayıtBilgi");
            db.add('teyit-sayısı.toplamkayıt',1);
            db.add('teyit-sayısı.kadınkayıt',1);
            db2.set(`${üye.id}.kayıt-bilgi.kayıt-eden`,message.author.id);
            db2.set(`${üye.id}.kayıt-bilgi.kayıt-edildiği-zaman`,Date.now());

        }else{
            let s = new MessageEmbed()
            .setDescription(`Gerekli yetkiye sahip değilsin.`)
            .setFooter(message.guild.name)
            message.channel.send(s).catch(err => console.log(err.message));
        };
    }
}