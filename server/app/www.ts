import * as dotenv from 'dotenv';
import { Container } from 'inversify';
import 'reflect-metadata';
import { containerBootstrapper } from './inversify.config';
import { Server } from './server';
import Types from './types';

dotenv.config();

void (async () => {
    const container: Container = await containerBootstrapper();
    const server: Server = container.get<Server>(Types.Server);

    server.init();
})();
