import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { GroupParams } from '../models/group-params.model';
import { PeopleParams } from '../models/people-params.model';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

import { ModifyServerDataService } from './modify-groups.service';

@Injectable()
export class FilterSorterService {

  private sortParams$$ = new BehaviorSubject<boolean | null>(null);

  public sortParams$ = this.sortParams$$.asObservable();

  private filterParameter$$ = new BehaviorSubject<string>('');

  public filterParameter$ = this.filterParameter$$.asObservable();

  private groupsFromServer$: Observable<GroupParams[]> = this.connectionsStoreFacadeService.selectGroups$;

  private peopleFromServer$: Observable<PeopleParams[]> = this.connectionsStoreFacadeService.selectPeople$;

  public groups$: Observable<GroupParams[]> = this.modifyServerDataService.update(
    this.groupsFromServer$,
    this.sortParams$,
    this.filterParameter$
  )

  public people$: Observable<PeopleParams[]> = this.modifyServerDataService.update(
    this.peopleFromServer$,
    this.sortParams$,
    this.filterParameter$
  );

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private modifyServerDataService: ModifyServerDataService,
  ) { }

  public updateDataSort(asc: boolean) {
    this.sortParams$$.next(asc);
  }

  public updateDataFilter(data: string): void {
    this.filterParameter$$.next(data);
  }
}
