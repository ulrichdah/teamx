import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';

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

        this.router.get('/infoStudent/:id', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            this.userPersistenceService.getStudentInfo(req.query.id);
            res.sendStatus(HTTP_STATUS_CREATED);
        });

        this.router.get('/infoTeam/:id', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            // this.userPersistenceService.storeMessage(message);
            res.sendStatus(HTTP_STATUS_CREATED);
        });

        this.router.post('/addStudent', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            // this.userPersistenceService.storeMessage(message);
            res.sendStatus(HTTP_STATUS_CREATED);
        });

        this.router.post('/addTeam', (req:Request, res: Response, next:NextFunction) => {
            // const message: Message = req.body;
            // this.userPersistenceService.storeMessage(message);
            res.sendStatus(HTTP_STATUS_CREATED);
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
