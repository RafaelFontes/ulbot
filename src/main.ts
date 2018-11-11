import installer from './installer';
import { DiscordClient } from './discord-client';
import { VersionPlugin } from './plugin/version/version.plugin';

const discordClient = installer.resolve<DiscordClient>(DiscordClient);

discordClient.connect();