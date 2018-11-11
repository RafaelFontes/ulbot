import 'reflect-metadata';

import { Container } from 'inversify';
import { ConfigPlugin } from './plugin/config/config.plugin';
import { ResourceLoaderPlugin } from './plugin/resource-loader/resource-loader';
import { LoggerPlugin } from './plugin/logger/logger.plugin';
import { VersionPlugin } from './plugin/version/version.plugin';

const container = new Container();

container.bind<ResourceLoaderPlugin>(ResourceLoaderPlugin).toSelf().inSingletonScope();
container.bind<ConfigPlugin>(ConfigPlugin).toSelf().inSingletonScope();
container.bind<LoggerPlugin>(LoggerPlugin).toSelf().inSingletonScope();

container.bind<VersionPlugin>(VersionPlugin).toSelf();


export default container;