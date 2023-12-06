import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './core/guards/auth.guard';
import { nonAuthGuard } from './core/guards/non-auth.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [nonAuthGuard],
  },

  {
    path: '',
    loadChildren: () => import('./connections/connections.module').then(m => m.ConnectionsModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
