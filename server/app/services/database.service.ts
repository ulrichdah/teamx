import { injectable } from 'inversify';
import * as mongodb from 'mongodb';

@injectable()
export class DatabaseService {

    connect(): Promise<mongodb.Db> {
        return new Promise<mongodb.Db>(async (resolve, reject) => {
            try {
                const uri = 'mongodb+srv://teamx-user0:' + process.env.DB_PASSWORD +
                '@teamxcluster0.ktn55.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority';
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