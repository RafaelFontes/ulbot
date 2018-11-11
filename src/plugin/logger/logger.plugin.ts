import { LoggerInterface } from '../interface/logger.interface';
import { injectable } from 'inversify';
import * as Discord from 'discord.js';

@injectable()
export class LoggerPlugin implements LoggerInterface
{
    debugDiscordMessage(message: Discord.Message) {
        const debugStringArray = [];
                
        debugStringArray.push("<")
        debugStringArray.push(new Date().toISOString().
        replace(/T/, ' ').      
        replace(/\..+/, ''))
        debugStringArray.push("> ")
        debugStringArray.push('[');
        debugStringArray.push(message.author.username);
        debugStringArray.push('] ');
        debugStringArray.push(message.content);

        console.log(debugStringArray.join(''));
    }

}