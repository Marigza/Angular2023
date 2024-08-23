import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseParams } from '../models/base-params.model';
import { CustomSortService } from './custom-sort.service';

@Injectable({
  providedIn: 'root'
})
export class ModifyGroupsService {

  constructor(private customSortService: CustomSortService,) { }

  public updateData<T extends BaseParams>(
    array: Observable<T[]>,
    sortParam: Observable<boolean | null>,
    filterParam: Observable<string>
  ): Observable<T[]> {
      return combineLatest([
        array,
        sortParam,
        filterParam
      ]).pipe(
        map(([array, sortParam, filterParam]) => {
          if (sortParam === null) return [...array].filter(group => group.name.S.toLowerCase().startsWith(filterParam.toLowerCase()))
          return [...array]
            .sort(this.customSortService.byField(sortParam))
            .filter(group => group.name.S.toLowerCase().startsWith(filterParam.toLowerCase()))
        })
      )
  }
}
