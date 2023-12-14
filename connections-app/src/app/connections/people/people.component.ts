import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defer, exhaustMap, filter, map, mergeMap, Subscription } from 'rxjs';

import { PeopleParams } from '../../core/models/people-params.model';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Component({
  selector: 'con-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit, OnDestroy {
  public people$ = this.connectionsStoreFacadeService.selectPeople$.pipe(
    map(people => people.filter(user => user.uid.S !== localStorage.getItem('uid')))
  );

  public conversations$ = this.connectionsStoreFacadeService.selectConversations$;

  public isLoad$ = this.connectionsStoreFacadeService.isLoading$.pipe(
    exhaustMap(() => this.connectionsStoreFacadeService.selectIsTimerPeopleLoading$)
  );

  public timer$ = this.connectionsStoreFacadeService.timerPeople$;

  public subs = new Subscription();

  constructor(
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.connectionsStoreFacadeService.selectPeople$
        .pipe(
          filter(peopleParams => peopleParams.length === 0),
          exhaustMap(() => this.connectionsStoreFacadeService.selectToken$),
          map(token => {
            token && this.connectionsStoreFacadeService.peopleRequestSend(token);
            token && this.connectionsStoreFacadeService.conversationsRequestSend(token);
          })
        )
        .subscribe(data => data)
    );
  }

  public update(): void {
    this.subs.add(
      this.connectionsStoreFacadeService.selectToken$
        .pipe(
          map(token => {
            token && this.connectionsStoreFacadeService.peopleUpdate(token);
          })
        )
        .subscribe(data => data)
    );
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
                : this.router.navigate([`/conversation/${dialog.id.S}`]).catch(({ message }: Error) => message || null)
            )
          )
        )
        .subscribe(data => data)
    );
  }

  /* eslint-disable class-methods-use-this */

  public trackByIndex(index: number, item: PeopleParams): string {
    return item.name.S;
  }

  /* eslint-enable class-methods-use-this */

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
