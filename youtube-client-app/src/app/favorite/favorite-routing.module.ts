import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailedInfoPageComponent } from '../youtube/pages/detailed-info-page/detailed-info-page.component';
import { FavoriteComponent } from './component/favorite/favorite.component';

const routes: Routes = [
  {
    children: [
      { path: '', component: FavoriteComponent },
      { path: ':cardId', component: DetailedInfoPageComponent },
    ],
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteRoutingModule {}
