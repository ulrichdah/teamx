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

    constructor(@inject(Types.DatabaseService) db: DatabaseService) {
        this.dbCollection = new DbCollection('users', db);
    }

    async doesUsernameExist(username: string): Promise<boolean> {
        const existingUsernames = await this.getAllUsernames();
        return existingUsernames.includes(username);
    }

    async addUser(newUser: User): Promise<boolean> {
        return await this.dbCollection.insertOne(newUser);
    }

    async updateUser(newUser: User): Promise<boolean> {
        const id = newUser._id;
        return await this.dbCollection.updateOne(id, newUser);
    }

    async login(userInfo: UserLoginInfo): Promise<LoginResult> {
        const user = await this.dbCollection.findOne({username: userInfo.username}) as User;
        if (user?.password === userInfo.password) {
            return { isLoggedIn: true, sessionId: user._id, username: user.username, userPhoto: user.userPhoto} as LoginResult;
        }
        return  { isLoggedIn: false} as LoginResult;
    }

    async getUser(username: string): Promise<User | null> {
        const user = await this.dbCollection.findOne({username}) as User;
        return user;
    }

    async getUsersByCourseAcronym(acronym: string): Promise<User[]> {
        const users: User[] = await this.dbCollection.find({courses: {$elemMatch: {acronym}} }) as User[];
        return users;
    }

    private async getAllUsernames(): Promise<string[]> {
        const allUsers = await this.dbCollection.find({}) as User[];
        const existingUsernames: string[] = [];
        allUsers.forEach((value: User) => {
            existingUsernames.push(value.username);
        });
        return existingUsernames;
    }

}
