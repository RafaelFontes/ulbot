import { injectable, inject } from 'inversify';
import * as Discord from 'discord.js';
import { BehaviorSubject } from 'rxjs';
import { CommandHookInterface } from './plugin/interface/command-hook.interface';
import { VersionPlugin } from './plugin/version/version.plugin';
import { ConfigPlugin } from './plugin/config/config.plugin';
import { LoggerPlugin } from './plugin/logger/logger.plugin';

@injectable()
export class DiscordClient {

    private connector: Discord.Client;
    
    messages: BehaviorSubject<Discord.Message>;

    commandHooks: CommandHookInterface[] = [];

    constructor(
        @inject(ConfigPlugin) private config: ConfigPlugin,
        @inject(LoggerPlugin) private logger: LoggerPlugin,
        @inject(VersionPlugin) versionPlugin: VersionPlugin,
    )
    {
        this.messages = new BehaviorSubject(null);

        this.commandHooks.push(versionPlugin);
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

            this.parseMessage(message);

            this.messages.next(message);
        });
    }

    private parseMessage(message: Discord.Message)
    {
        const { content } = message;

        if (content.length > 0) {
            const words = content.split(" ");
            if (words[0].match(/^\![^ ]+/)) {
                this.commandHooks.forEach((hook) => {
                    const commandOutput = hook.onCommand(words);

                    if (commandOutput) {
                        message.reply(commandOutput);
                    }
                });
            }
        }
    }
}