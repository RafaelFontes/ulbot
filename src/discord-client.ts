import { injectable, inject } from 'inversify';
import TYPES from './types';
import * as Discord from 'discord.js';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoggerInterface, ConfigInterface } from '@ul-plugin/interface';

@injectable()
export class DiscordClient {

    private connector: Discord.Client;
    
    messages: BehaviorSubject<Discord.Message>;

    constructor(
        @inject(TYPES.CONFIG_INTERFACE) private config: ConfigInterface,
        @inject(TYPES.LOGGER_INTERFACE) private logger: LoggerInterface,
    )
    {
        this.messages = new BehaviorSubject(null);
    }

    connect()
    {
        this.config.load().subscribe(() => {
            this.login(this.config.getDiscordToken());
            this.setUpListeners();
        });
    }

    private login(token: string)
    {
        this.connector = new Discord.Client();
        this.connector.login(token);
    }

    private setUpListeners()
    {
        this.connector.on('ready', () => {
            console.log(`Logged in as ${this.connector.user.tag}!`);
        });

        this.connector.on('message', message => {
            if (this.config.isDebugEnabled()) {
                this.logger.debugDiscordMessage(message);
            }

            this.messages.next(message);
        });
    }
}