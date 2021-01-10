import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { User } from '../../../common/communication/users';

import { UserPersistenceService } from '../services/user-persistence.service';
import Types from '../types';

const HTTP_STATUS_CREATED = 201;

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
            const loginResult = await this.userPersistenceService.login(req.body);
            res.send(loginResult);
        });

        this.router.post('/username-existence', async (req:Request, res: Response, next:NextFunction) => {
            const isExistingUsername = await this.userPersistenceService.doesUsernameExist(req.body.username);
            res.send(isExistingUsername);
        });

        this.router.post('/addUser', async (req:Request, res: Response, next:NextFunction) => {
            const success = await this.userPersistenceService.addUser(req.body as User);
            res.send(success);
        });

        this.router.patch('/updateInfoStudent/:id', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            // this.userPersistenceService.storeMessage(message);
            res.sendStatus(HTTP_STATUS_CREATED);
        });

        this.router.patch('/updateInfoTeam/:id', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            // this.userPersistenceService.storeMessage(message);
            res.sendStatus(HTTP_STATUS_CREATED);
        });

        this.router.delete('/deleteStudent/:id', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            // this.userPersistenceService.storeMessage(message);
            res.sendStatus(HTTP_STATUS_CREATED);
        });

        this.router.delete('/deleteTeam/:id', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            // this.userPersistenceService.storeMessage(message);
            res.sendStatus(HTTP_STATUS_CREATED);
        });
    }
}
