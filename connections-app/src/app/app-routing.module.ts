import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
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
