export interface Course {
    id: string;
    name: string;
    students: Student[];
}

export interface Student {
    title: string;
    name: string;
    description: string;
    imageSrc: string;
}