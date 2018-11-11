import * as Discord from 'discord.js';
export interface LoggerInterface
{
    debugDiscordMessage(message: Discord.Message);
}