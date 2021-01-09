import { Container } from 'inversify';
import { Application } from './app';
import { UserPersistenceController } from './controllers/user-persistence.controller';
import { Server } from './server';
import { DatabaseService } from './services/database.service';
import { UserPersistenceService } from './services/user-persistence.service';
import Types from './types';

export const containerBootstrapper: () => Promise<Container> = async () => {
    const container: Container = new Container();

    container.bind(Types.Server).to(Server);
    container.bind(Types.Application).to(Application);

    container.bind(Types.UserPersistenceService).to(UserPersistenceService);
    container.bind(Types.UserPersistenceController).to(UserPersistenceController);

    container.bind(Types.DatabaseService).to(DatabaseService);

    return container;
};
