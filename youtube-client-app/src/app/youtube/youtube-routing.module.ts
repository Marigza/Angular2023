import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { DetailedInfoPageComponent } from './pages/detailed-info-page/detailed-info-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    children: [
      { path: '', component: MainPageComponent },
      { path: 'admin', component: AdminComponent },
      { path: ':cardId', component: DetailedInfoPageComponent },
    ],
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
