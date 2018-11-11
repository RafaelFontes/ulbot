import 'reflect-metadata';

import { Container } from 'inversify';
import { ConfigInterface } from '@ul-plugin/interface';
import TYPES from './types';
import { ConfigPlugin } from './plugin/config/config.plugin';
import { ResourceLoaderPlugin } from './plugin/resource-loader/resource-loader';
import { ResourceLoaderInterface } from '@ul-plugin/interface';
import { LoggerInterface } from './plugin/interface/logger.interface';
import { LoggerPlugin } from './plugin/logger/logger.plugin';

const container = new Container();

container.bind<ResourceLoaderInterface>(TYPES.RESOURCE_LOADER).to(ResourceLoaderPlugin);
container.bind<ConfigInterface>(TYPES.CONFIG_INTERFACE).to(ConfigPlugin);
container.bind<LoggerInterface>(TYPES.LOGGER_INTERFACE).to(LoggerPlugin);

export default container;