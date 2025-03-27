import { Routes } from '@angular/router';
import { StudentsListComponent } from './pages/students-list/students-list.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

export const studentsRoutes: Routes = [
  {
    path: 'list',
    component: StudentsListComponent,
  },
  {
    path: 'detail',
    component: StudentDetailComponent,
  },
  {
    path: 'detail/:id',
    component: StudentDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

export default studentsRoutes;
