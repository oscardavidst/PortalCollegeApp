import { Routes } from '@angular/router';

import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

export const coursesRoutes: Routes = [
  {
    path: 'list',
    component: CoursesListComponent,
  },
  {
    path: 'detail',
    component: CourseDetailComponent,
  },
  {
    path: 'detail/:id',
    component: CourseDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

export default coursesRoutes;
