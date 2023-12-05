import { Component } from '@angular/core';

import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsHttpService } from '../../core/services/connections-http.service';

@Component({
  selector: 'con-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  constructor(private connectionsHttpService: ConnectionsHttpService) {
    this.showGroups();
  }

  public showGroups(): void {
    const token: TokenParams = {
      // заменить получением токена
      'rs-uid': 'iptcfxklsv7',
      'rs-email': 'test',
      Authorization: 'snxq183xbql',
    };
    this.connectionsHttpService.getGroups$(token).subscribe(res => res);

    // console.log(res);
    // убрать эту бобуйню;
  }
}
