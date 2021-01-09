import { injectable } from 'inversify';
import * as mongodb from 'mongodb';

const DB_PASSWORD = 'OilRHNKOLrJcNi9s';
const DB_NAME = 'teamx_0';
const uri = 'mongodb+srv://teamx-user0:' + DB_PASSWORD + '@teamxcluster0.ktn55.mongodb.net/' + DB_NAME + '?retryWrites=true&w=majority';

@injectable()
export class DatabaseService {

    connect(): Promise<mongodb.Db> {
        return new Promise<mongodb.Db>(async (resolve, reject) => {
            try {
                console.log('Connecting to database...');
                const dbHandle = (await mongodb.MongoClient.connect(uri, { useUnifiedTopology: true })).db();
                console.log('Database connected!');
                resolve(dbHandle);
            } catch (e) {
                reject(e);
            }
        });
    }
}