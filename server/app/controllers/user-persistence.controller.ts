import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { User } from '../../../common/communication/users';

import { UserPersistenceService } from '../services/user-persistence.service';
import Types from '../types';

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_INTERNAL_ERROR = 500;

@injectable()
export class UserPersistenceController {
    router: Router;

    constructor(@inject(Types.UserPersistenceService) private userPersistenceService: UserPersistenceService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();
        // TODO
        this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            // const time: Message = await this.userPersistenceService.helloWorld();
            // res.json(time);
        });

        this.router.post('/login', async (req:Request, res: Response, next:NextFunction) => {
            const loginResult = await this.userPersistenceService.login(req.body).catch((reason) => {
                console.error('An error occured during the login. Details: ' + reason);
            });
            res.send(loginResult);
        });

        this.router.post('/username-existence', async (req:Request, res: Response, next:NextFunction) => {
            const isExistingUsername = await this.userPersistenceService.doesUsernameExist(req.body.username).catch((reason) => {
                console.error('An error occured during the username existence check. Details: ' + reason);
            });
            res.send(isExistingUsername);
        });

        this.router.post('/addUser', async (req:Request, res: Response, next:NextFunction) => {
            const success = await this.userPersistenceService.addUser(req.body as User).catch((reason) => {
                console.error('An error occured when trying to add a new user. Details: ' + reason);
            });
            res.send(success);
        });

        this.router.get('/getUser/:username', async (req:Request, res: Response, next:NextFunction) => {
            const username = req.params.username;
            const user = await this.userPersistenceService.getUser(username).catch((reason) => {
                console.error('An error occured when trying to get user information for the username: ' + username + '. Details: ' + reason);
            });
            if (user) res.send(user);
            else {
                console.error('No user found with the username: ' + username);
                res.sendStatus(HTTP_STATUS_INTERNAL_ERROR);
            }
        });

        this.router.get('/getUsersByCourse/:acronym', async (req:Request, res: Response, next:NextFunction) => {
            const acronym = req.params.acronym;
            const users = await this.userPersistenceService.getUsersByCourseAcronym(acronym).catch((reason) => {
                console.error('An error occured when trying to get users registered to the course ' + acronym + '. Details: ' + reason);
            });
            if (users) res.send(users);
            else {
                console.error('No user found for course: ' + acronym);
                res.sendStatus(HTTP_STATUS_INTERNAL_ERROR);
            }
        });

        this.router.patch('/updateUser', async (req:Request, res: Response, next:NextFunction) => {
            const user: User = req.body;
            if (user._id) {
                const success = await this.userPersistenceService.updateUser(user).catch((reason) => {
                    console.error('An error occured when trying to update user information for the username: ' +
                    user.username + '. Details: ' + reason);
                });
                if (success) res.send(success);
                else {
                    console.error('No user found with the username: ' + user.username);
                    res.sendStatus(HTTP_STATUS_INTERNAL_ERROR);
                }
            } else {
                console.error('Can\'t update user without _id' + user.username);
                res.sendStatus(HTTP_STATUS_INTERNAL_ERROR);
            }
        });

        this.router.delete('/deleteStudent/:id', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            // this.userPersistenceService.storeMessage(message);
            res.sendStatus(HTTP_STATUS_CREATED);
        });
    }
}
