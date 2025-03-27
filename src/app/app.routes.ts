import { Routes } from '@angular/router';
import { NotAutheticatedGuard } from './auth/guards/not-autheticated.guard';
import { AutheticatedGuard } from './auth/guards/autheticated.guard';

export const routes: Routes = [
  {
    path: 'layout',
    loadChildren: () => import('./layout/layout.routes'),
    canMatch: [AutheticatedGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [NotAutheticatedGuard],
  },
  {
    path: '**',
    redirectTo: 'layout',
  },
];
