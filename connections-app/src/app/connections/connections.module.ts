import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ConnectionsBlockComponent } from './connections-block/connections-block.component';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { GroupComponent } from './group/group.component';
import { MaterialModule } from './material.module';
import { PeopleComponent } from './people/people.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [ConnectionsBlockComponent, GroupComponent, PeopleComponent, ProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, ConnectionsRoutingModule, MaterialModule],
})
export class ConnectionsModule {}