import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    // canActivate: [loginGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [loginGuard],
  },

  {
    path: '',
    loadChildren: () => import('./connections/connections.module').then(m => m.ConnectionsModule),
    // canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
    // canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
