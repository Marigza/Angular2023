import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { GroupParams } from '../models/group-params.model';
import { PeopleParams } from '../models/people-params.model';
import { CustomSortService } from './custom-sort.service';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Injectable({
  providedIn: 'root'
})
export class FilterSorterService {

  private sortParams$$ = new BehaviorSubject<boolean | null>(null);

  public sortParams$ = this.sortParams$$.asObservable()

  private groupsFromServer$: Observable<GroupParams[]> = this.connectionsStoreFacadeService.selectGroups$;

  private peopleFromServer$: Observable<PeopleParams[]> = this.connectionsStoreFacadeService.selectPeople$;

  public groups$: Observable<GroupParams[]> = combineLatest([this.groupsFromServer$, this.sortParams$]).pipe(
    map(([groups, asc]) => {
      if (asc === null) return [...groups]
      return [...groups].sort(this.customSortService.byField(asc))
    })
  )

  public people$: Observable<PeopleParams[]> = this.peopleFromServer$;

  constructor(
    private customSortService: CustomSortService,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService
  ) { }

  public filterArray(arr: GroupParams[] | PeopleParams[]) { }

  public updateDataSort(asc: boolean) {
    this.sortParams$$.next(asc)
  }
}
