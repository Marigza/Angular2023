import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

export const nonAuthGuard = (): boolean | UrlTree => {
  const router = inject(Router);

  if (!localStorage.getItem('token')) {
    return true;
  }

  return router.parseUrl('/');
};
