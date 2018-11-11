import installer from './installer';
import { DiscordClient } from './discord-client';

const discordClient = installer.resolve<DiscordClient>(DiscordClient);

discordClient.connect();


/*import * as Discord from 'discord.js';
import { Config } from './config';
const client = new Discord.Client();
=
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login('NTExMDM4Mzc5NzYxMzM2MzIx.DslFqg.mIpwn5wLkAft5ewUCS56INWRz4E');
*/
