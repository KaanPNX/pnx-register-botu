const { MessageEmbed } = require('discord.js');
const Database = require('../Database/Database');

module.exports = {
    name: "kayıt-bilgi",
    aliases: [],
    description: 'kullanıcıyı kimin kaydettiğini gösterir.',
    async execute(message, args) {
        if(message.member.hasPermission('ADMINISTRATOR')){
            let üye = message.mentios.users.first();
            if(!üye){
                let s = new MessageEmbed()
                .setDescription(`Lütfen bir üye etiketleyip tekrar deneyin.`)
                .setFooter(message.guild.name)
                return message.channel.send(s).catch(err => console.log(err.message));
            };

            const db = new Database("./Servers/" + message.guild.id, "KayıtBilgi");
            let user = db.get(`${üye.id}.kayıt-bilgi.kayıt-eden`);
            let zaman = db.get(`${üye.id}.kayıt-bilgi.kayıt-edildiği-zaman`);
            user = message.guild.members.cache.get(user.id);

            var days = Math.floor(zaman / (1000 * 60 * 60 * 24));
            var hours = Math.floor((zaman % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            let s = new MessageEmbed()
            .setDescription(`Kayıt eden yetkili: ${user.user.username}\n\nKayıt Edildiği Zaman: ${days} gün, ${hours} saat`)
            .setFooter(message.guild.name);
            message.channel.send(s).catch(err => console.log(err.message));
        };  
    }
}