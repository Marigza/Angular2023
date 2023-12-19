import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectionsBlockComponent } from './connections-block/connections-block.component';
import { ConversationComponent } from './conversation/conversation.component';
import { GroupDedicatedComponent } from './group-dedicated/group-dedicated.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    children: [
      { path: '', component: ConnectionsBlockComponent },
      { path: 'group/:groupId', component: GroupDedicatedComponent },
      { path: 'conversation/:conversationId', component: ConversationComponent },
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
