import { Injectable } from '@angular/core';

import { BaseParams } from '../models/base-params.model';

@Injectable({
  providedIn: 'root',
})
export class CustomSortService {
  /* eslint-disable class-methods-use-this */

  public byName(asc: boolean): (a: BaseParams, b: BaseParams) => -1 | 1 {
    if (asc) {
      return (a: BaseParams, b: BaseParams) => (a.name.S > b.name.S ? 1 : -1);
    }

    return (a: BaseParams, b: BaseParams) => (a.name.S > b.name.S ? -1 : 1);
  }

  /* eslint-enable class-methods-use-this */
}
