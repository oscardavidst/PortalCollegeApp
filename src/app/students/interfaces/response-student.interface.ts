import { Course } from '../../courses/interfaces/course.interface';

export interface ResponseStudent {
  id: number;
  name: string;
  lastName: string;
  email: string;
  creditsCount: number;
  coursesEnrollments: Course[];
}
