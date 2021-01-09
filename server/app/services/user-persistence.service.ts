import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { LoginResult, UserLoginInfo } from '../../../common/communication/user-login-info';
import { Student } from '../../../common/communication/users';
import { DbCollection } from '../classes/db-collection';
import Types from '../types';
import { DatabaseService } from './database.service';

@injectable()
export class UserPersistenceService {

    private dbCollection: DbCollection;

    constructor(@inject(Types.DatabaseService) db: DatabaseService) {
        this.dbCollection = new DbCollection('users', db);
    }

    getStudentInfo(id: string): Student {
        this.dbCollection.insertOne({} as Student);
        return {} as Student;
    }

    addStudent(student: Student): void {
        this.dbCollection.insertOne(student);
    }

    async login(userInfo: UserLoginInfo): Promise<LoginResult> {
        const user = await this.dbCollection.findOne({username: userInfo.username});
        if (user?.password === userInfo.password) return { isLoggedIn: true, sessionId: user._id} as LoginResult;
        return  { isLoggedIn: false} as LoginResult;
    }

}
