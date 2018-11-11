import { CommandHookInterface } from '../interface/command-hook.interface';
import { injectable, inject } from 'inversify';
import { ConfigPlugin } from '../config/config.plugin';
@injectable()
export class VersionPlugin implements CommandHookInterface
{
    constructor(
        @inject(ConfigPlugin) private config: ConfigPlugin
    )
    {
        
    }

    onCommand(args: string[]) : string
    {
        return 'UL Discord Bot v' + this.config.getVersion();
    }
}