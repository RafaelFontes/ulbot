import * as Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login('NTExMDM4Mzc5NzYxMzM2MzIx.DslFqg.mIpwn5wLkAft5ewUCS56INWRz4E');