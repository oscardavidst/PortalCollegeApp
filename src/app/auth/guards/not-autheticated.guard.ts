import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAutheticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAutheticated = await firstValueFrom(authService.checkStatus());
  if (isAutheticated) {
    router.navigateByUrl('/layout');
    return false;
  }

  return true;
};
