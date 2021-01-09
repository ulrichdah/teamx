import { Course } from "./course";

export interface Student {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    facebook: string;
    courses: UserCourse[]
}

export interface Team {
    _id?: string;
    username: string;
    password: string;
    email: string;
    facebook: string;
    courses: UserCourse[]
}

export interface UserCourse extends Course {
    experience: string;
    goals: string;
    grade: string;
    availabilities: string;
}