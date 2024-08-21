import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GroupParams } from '../models/group-params.model';
import { PeopleParams } from '../models/people-params.model';
import { CustomSortService } from './custom-sort.service';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';
import { BaseParams } from '../models/base-params.model';

@Injectable({
  providedIn: 'root'
})
export class FilterSorterService {

  private sortParams$$ = new BehaviorSubject<boolean | null>(null);

  public sortParams$ = this.sortParams$$.asObservable();

  private filterParameter$$ = new BehaviorSubject<string>('');

  public filterParameter$ = this.filterParameter$$.asObservable();

  private groupsFromServer$: Observable<GroupParams[]> = this.connectionsStoreFacadeService.selectGroups$;

  private peopleFromServer$: Observable<PeopleParams[]> = this.connectionsStoreFacadeService.selectPeople$;

  public groups$: Observable<GroupParams[]> = this.modifyDataFromServer(
    this.groupsFromServer$,
    this.sortParams$,
    this.filterParameter$
  )

  public people$: Observable<PeopleParams[]> = this.modifyDataFromServer(
    this.peopleFromServer$,
    this.sortParams$,
    this.filterParameter$
  );

  constructor(
    private customSortService: CustomSortService,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService
  ) { }

  private modifyDataFromServer<T extends BaseParams>(
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

  public updateDataSort(asc: boolean) {
    this.sortParams$$.next(asc)
  }

  public updateDataFilter(data: string): void {
    this.filterParameter$$.next(data);
  }
}
