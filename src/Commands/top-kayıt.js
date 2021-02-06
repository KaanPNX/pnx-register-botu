const Database = require('../Database/Database');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "top-kayıt",
    aliases: [],
    description: 'top 10 kayıt yapan yetkilileri gösterir.',
    async execute(message, args) {
        const db = new Database("./Servers/" + message.guild.id, "Teyit");
        var data = db.get(`teyit-sayısı.toplamkayıt`) || {};

        var list = Object.keys(data).map(_data => {
            return {
                Id: _data,
                Value: (data[_data].toplamkayıt || 0)
            };
        }).sort((x, y) => y.Value - x.Value);
        let lists = list.splice(0, 10).map((item, index) => `\`${index + 1}.\` <@${item.Id}>: \`${item.Value} Kayıt\``).join("\n");
        
        let s = new MessageEmbed()
        .setDescription(lists)
        .setFooter(message.guild.name)
        message.channel.send(s);
    }
}