import { injectable } from 'inversify';
import 'reflect-metadata';
import { Student } from '../../../common/communication/users';
import { DbCollection } from '../classes/db-collection';

@injectable()
export class UserPersistenceService {

    private dbCollection: DbCollection;

    constructor() {
        this.dbCollection = new DbCollection('user');
    }

    getStudentInfo(id: string): Student {
        this.dbCollection.insertOne({} as Student);
        return {} as Student;
    }

}
