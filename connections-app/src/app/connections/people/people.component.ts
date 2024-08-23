import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defer, exhaustMap, filter, map, mergeMap, Subscription, take } from 'rxjs';

import { PeopleParams } from '../../core/models/people-params.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';
import { FilterSorterService } from '../../core/services/filter-sorter.service';

@Component({
  selector: 'con-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [FilterSorterService]
})
export class PeopleComponent implements OnInit, OnDestroy {

  public people$ = this.filterSorterService.people$

  public conversations$ = this.connectionsStoreFacadeService.selectConversations$;

  public isLoad$ = this.connectionsStoreFacadeService.isLoading$.pipe(
    exhaustMap(() => this.connectionsStoreFacadeService.selectIsTimerPeopleLoading$)
  );

  public timer$ = this.connectionsStoreFacadeService.timerPeople$;

  public subs = new Subscription();

  private userToken: TokenParams | null = null;

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private router: Router,
    private filterSorterService: FilterSorterService,
  ) {}

  public ngOnInit(): void {
    this.connectionsStoreFacadeService.selectToken$.pipe(filter(Boolean), take(1)).subscribe(userToken => {
      this.userToken = userToken;
    });

    if (!this.userToken) return;

    this.subs.add(
      this.connectionsStoreFacadeService.selectPeople$
        .pipe(
          map(people => {
            if (people.length !== 0) return;
            this.userToken && this.connectionsStoreFacadeService.peopleRequestSend(this.userToken);
            this.userToken && this.connectionsStoreFacadeService.conversationsRequestSend(this.userToken);
          })
        )
        .subscribe(data => data)
    );
  }

  public addFilterValue(newValue: string) {
     this.filterSorterService.updateDataFilter(newValue);
  }

  public addSortValue(newValue: boolean) {
    this.filterSorterService.updateDataSort(newValue);
  }

  public update(): void {
    if (!this.userToken) return;

    this.connectionsStoreFacadeService.peopleUpdate(this.userToken);
  }

  public openDialog(userId: string): void {
    this.subs.add(
      this.conversations$
        .pipe(
          map(conversations => {
            return conversations.map(dialog => dialog).find(user => user.companionID.S === userId);
          }),
          mergeMap(dialog =>
            defer(() =>
              dialog === undefined
                ? this.connectionsStoreFacadeService.selectToken$.pipe(
                    map(token => {
                      token && this.connectionsStoreFacadeService.createConversation(token, userId);
                    })
                  )
                : this.router.navigate([`/conversation/${dialog.id.S}`]).catch(console.error)
            )
          )
        )
        .subscribe()
    );
  }

  /* eslint-disable class-methods-use-this */

  public trackByIndex(_: number, item: PeopleParams): string {
    return item.name.S;
  }

  /* eslint-enable class-methods-use-this */

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
