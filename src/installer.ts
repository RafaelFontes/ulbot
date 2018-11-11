import 'reflect-metadata';

import { Container } from 'inversify';
import { ConfigInterface } from '@ul-plugin/interface';
import TYPES from './types';
import { Config } from './config';
import { ResourceLoader } from './resource-loader';
import { ResourceLoaderInterface } from '@ul-plugin/interface';

const container = new Container();

container.bind<ResourceLoaderInterface>(TYPES.RESOURCE_LOADER).to(ResourceLoader);
container.bind<ConfigInterface>(TYPES.CONFIG_INTERFACE).to(Config);

export default container;