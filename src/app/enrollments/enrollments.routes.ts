import { Routes } from '@angular/router';
import { EnrollmentsListComponent } from './pages/enrollments-list/enrollments-list.component';

export const enrollmentsroutes: Routes = [
  {
    path: 'list',
    component: EnrollmentsListComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

export default enrollmentsroutes;
