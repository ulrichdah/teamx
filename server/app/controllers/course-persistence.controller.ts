import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { CoursePersistenceService } from '../services/course-persistency.service';
import Types from '../types';

const HTTP_STATUS_INTERNAL_ERROR = 500;

@injectable()
export class CoursePersistenceController {
    router: Router;

    constructor(@inject(Types.CoursePersistenceService) private coursePersistenceService: CoursePersistenceService) {
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

        this.router.get('/getExistingCourses', async (req:Request, res: Response, next:NextFunction) => {
            const existingCourses = await this.coursePersistenceService.getCourses().catch((reason) => {
                console.error('An error occured when trying to get existing courses list. Details: ' + reason);
                res.sendStatus(HTTP_STATUS_INTERNAL_ERROR);
            });
            res.send(existingCourses);
        });
    }
}
