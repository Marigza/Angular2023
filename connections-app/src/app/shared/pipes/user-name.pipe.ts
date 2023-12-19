import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { ConnectionsStoreFacadeService } from '../services/connections-store-facade.service';

@Pipe({
  name: 'userName',
  standalone: true,
})
export class UserNamePipe implements PipeTransform {
  constructor(private connectionsStoreFacadeService: ConnectionsStoreFacadeService) {}

  public transform(value: string): Observable<string | undefined> {
    return this.connectionsStoreFacadeService.getUserById(value);
  }
}
