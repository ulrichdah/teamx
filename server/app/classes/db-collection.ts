import { inject } from 'inversify';
import * as mongodb from 'mongodb';
import { Course } from '../../../common/communication/course';
import { User } from '../../../common/communication/users';
import { DatabaseService } from '../services/database.service';
import Types from '../types';

export class DbCollection {
    static dbHandle: mongodb.Db;
    private collection: mongodb.Collection;

    constructor(collectionName: string, @inject(Types.DatabaseService) private db: DatabaseService) {
        this.init(collectionName);
    }

    async insertOne(data: Course | User): Promise<boolean> {
        const result = await this.collection.insertOne(data);
        return result.insertedCount === 1;
    }

    async insertMany(data: Course[]): Promise<void> {
        await this.collection.insertMany(data);
    }

    // tslint:disable-next-line:no-any
    async findOne(query: mongodb.FilterQuery<any>): Promise<User | null> {
        return await this.collection.findOne(query);
    }

    // tslint:disable-next-line:no-any
    async find(query: mongodb.FilterQuery<any>): Promise<User[]> {
        return (await this.collection.find(query).toArray()) as User[];
    }

    async updateOne(username: string, newUser: User): Promise<boolean> {
        const result = await this.collection.updateOne({username}, {$set: newUser});
        return result.modifiedCount === 1;
    }

    private async init(collectionName: string): Promise<void> {
        if (!DbCollection.dbHandle) await this.initDB();
        this.collection = DbCollection.dbHandle.collection(collectionName);
    }

    private async initDB(): Promise<void> {
        try {
            DbCollection.dbHandle = await this.db.connect();
        } catch(e) {
            console.error(e);
        }
    }
}