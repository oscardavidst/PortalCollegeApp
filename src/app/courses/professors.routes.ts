import { Routes } from '@angular/router';

import { ProfessorsListComponent } from './pages/professors-list/professors-list.component';
import { ProfessorDetailComponent } from './pages/professor-detail/professor-detail.component';

export const professorsRoutes: Routes = [
  {
    path: 'list',
    component: ProfessorsListComponent,
  },
  {
    path: 'detail',
    component: ProfessorDetailComponent,
  },
  {
    path: 'detail/:id',
    component: ProfessorDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

export default professorsRoutes;
