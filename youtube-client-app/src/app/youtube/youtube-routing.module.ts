import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { DetailedInfoPageComponent } from './pages/detailed-info-page/detailed-info-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'cards/:cardId', component: DetailedInfoPageComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
