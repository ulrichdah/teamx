import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Course } from '../../../common/communication/course';
import { DbCollection } from '../classes/db-collection';
import Types from '../types';
import { DatabaseService } from './database.service';

@injectable()
export class CoursePersistenceService {

    private dbCollection: DbCollection;

    constructor(@inject(Types.DatabaseService) db: DatabaseService) {
        this.dbCollection = new DbCollection('courses', db);
    }

    async doesCourseExist(acronym: string): Promise<boolean> {
        const existingCourses = await this.getAllCourses();
        return existingCourses.includes(acronym);
    }

    async addCourse(newCourse: Course): Promise<boolean> {
        return await this.dbCollection.insertOne(newCourse);
    }

    async getCourse(acronym: string): Promise<Course | null> {
        const user = await this.dbCollection.findOne({acronym}) as Course;
        return user;
    }

    async getCourses(): Promise<Course[]> {
        return await this.dbCollection.find({}) as Course[];
    }

    private async getAllCourses(): Promise<string[]> {
        const courses = await this.dbCollection.find({}) as Course[];
        const existingCourses: string[] = [];
        courses.forEach((value: Course) => {
            existingCourses.push(value.acronym);
        });
        return existingCourses;
    }

}
