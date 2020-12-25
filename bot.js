const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const { prefix, knavesıd} = require("./ayarlar.json");
const { token } = require("./ayarlar.json")
const AsciiTable = require('ascii-table');
const db = require("wio.db");
const fs = require("fs");
const Moment = require('moment');
require('./util/eventHandler.js')(client);



/////TABLES////
var commandtable = new AsciiTable('Eğlence Command Table');
/////TABLES////

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


fs.readdirSync('./commands').forEach(dir => {
const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const komutcuklar = require(`./commands/${dir}/${file}`);
  var table = new AsciiTable('Eğlence Command Table');
  table.setHeading("Command", 'Status', "Aliases")
  if (komutcuklar.help.name) {
  client.commands.set(komutcuklar.help.name, komutcuklar);
  table.addRow(komutcuklar.help.name, "çalışıyor", komutcuklar.conf.aliases)
} else {
  table.addRow(komutcuklar.help.name, "çalışmıyor")
  continue;
    }
 
    komutcuklar.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutcuklar.help.name);
    });

    console.log(table.toString())
  }
  
})



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === 777229793232945173n) permlvl = 4;
  return permlvl;
};


client.login(token);