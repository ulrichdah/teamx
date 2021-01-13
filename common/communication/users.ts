import { Course } from "./course";

export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    teamName?: string;
    userPhoto?: string;
    accountType: string;
    username: string;
    password: string;
    email: string;
    facebook: string;
    courses: UserCourse[]
}

export interface UserCourse extends Course {
    experiences: string;
    goals: string;
    grade: string;
    availabilities: string;
}