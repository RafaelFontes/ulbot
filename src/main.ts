import installer from './installer';
import { DiscordClient } from './discord-client';

const discordClient = installer.resolve<DiscordClient>(DiscordClient);

discordClient.connect();