import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'enrollment',
        loadChildren: () => import('../enrollments/enrollments.routes'),
      },
      {
        path: 'student',
        loadChildren: () => import('../students/students.routes'),
      },
      {
        path: 'professor',
        loadChildren: () => import('../professors/professors.routes'),
      },
      {
        path: '**',
        redirectTo: 'enrollment',
      },
    ],
  },
];

export default layoutRoutes;
