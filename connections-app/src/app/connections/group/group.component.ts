import { Component } from '@angular/core';

import { GroupParams } from '../../core/models/group-params.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsHttpService } from '../../core/services/connections-http.service';

@Component({
  selector: 'con-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  public groups: GroupParams[] = [];

  constructor(private connectionsHttpService: ConnectionsHttpService) {
    this.showGroups();
  }

  public showGroups(): void {
    const token: TokenParams = {
      uid: localStorage.getItem('uid') ?? '',
      email: localStorage.getItem('email') ?? '',
      token: localStorage.getItem('token') ?? '',
    };
    this.connectionsHttpService.getGroups$(token).subscribe(res => {
      this.groups = res.Items;
    });

    // console.log(res);
    // убрать эту бобуйню;
  }

  /* eslint-disable class-methods-use-this */

  public trackByIndex(index: number, item: GroupParams): string {
    return item.id.S;
  }

  /* eslint-enable class-methods-use-this */
}
