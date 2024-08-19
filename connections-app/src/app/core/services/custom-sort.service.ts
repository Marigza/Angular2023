import { Injectable } from '@angular/core';

import { GroupParams } from '../models/group-params.model';
import { PeopleParams } from '../models/people-params.model';

@Injectable({
  providedIn: 'root',
})
export class CustomSortService {
  /* eslint-disable class-methods-use-this */

  public byField(asc: boolean): (a: PeopleParams | GroupParams, b: PeopleParams | GroupParams) => -1 | 1 {
    if (asc) {
      return (a: PeopleParams | GroupParams, b: PeopleParams | GroupParams) => (a.name.S > b.name.S ? 1 : -1);
    }

    return (a: PeopleParams | GroupParams, b: PeopleParams | GroupParams) => (a.name.S > b.name.S ? -1 : 1);
  }

  /* eslint-enable class-methods-use-this */
}
