import * as mongodb from 'mongodb';
import { Course } from '../../../common/communication/course';
import { Student, Team } from '../../../common/communication/users';

export class DbCollection {
    static dbHandle: mongodb.Db;
    private collection: mongodb.Collection;

    constructor(collectionName: string) {
        this.collection = DbCollection.dbHandle.collection(collectionName);
    }

    async insertOne(data: Course | Team | Student): Promise<void> {
        await this.collection.insertOne(data);
    }

    async insertMany(data: Course[]): Promise<void> {
        await this.collection.insertMany(data);
    }

    // TODO
    async find(query: mongodb.FilterQuery<string>): Promise<Student[]> {
        return (await this.collection.find(query).toArray()) as Student[];
    }
}