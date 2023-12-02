import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectionsBlockComponent } from './connections-block/connections-block.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    children: [
      { path: '', component: ConnectionsBlockComponent },
      { path: 'profile', component: ProfileComponent },
    ],
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsRoutingModule {}
