import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

export const authGuard = (): boolean | UrlTree => {
  const router = inject(Router);

  if (localStorage.getItem('token') !== null) {
    return true;
  }

  return router.parseUrl('/signin');
};
