import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { LoginResult, UserLoginInfo } from '../../../common/communication/user-login-info';
import { User } from '../../../common/communication/users';
import { DbCollection } from '../classes/db-collection';
import Types from '../types';
import { DatabaseService } from './database.service';

@injectable()
export class UserPersistenceService {

    private dbCollection: DbCollection;
    private existingUsernames: string[];

    constructor(@inject(Types.DatabaseService) db: DatabaseService) {
        this.dbCollection = new DbCollection('users', db);
    }

    getStudentInfo(id: string): User {
        this.dbCollection.insertOne({} as User);
        return {} as User;
    }

    async doesUsernameExist(username: string): Promise<boolean> {
        if (!this.existingUsernames) this.existingUsernames = await this.getAllUsernames();
        return this.existingUsernames.includes(username);
    }

    async addUser(newUser: User): Promise<boolean> {
        this.existingUsernames.push(newUser.username);
        return await this.dbCollection.insertOne(newUser);
    }

    async login(userInfo: UserLoginInfo): Promise<LoginResult> {
        const user = await this.dbCollection.findOne({username: userInfo.username});
        if (user?.password === userInfo.password) return { isLoggedIn: true, sessionId: user._id} as LoginResult;
        return  { isLoggedIn: false} as LoginResult;
    }

    private async getAllUsernames(): Promise<string[]> {
        const allUsers = await this.dbCollection.find({});
        const existingUsernames: string[] = [];
        allUsers.forEach((value: User) => {
            existingUsernames.push(value.username);
        });
        return existingUsernames;
    }

}
