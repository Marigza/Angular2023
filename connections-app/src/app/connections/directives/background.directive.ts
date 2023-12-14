import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';

import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Directive({
  selector: '[conBackground]',
})
export class BackgroundDirective implements OnInit, OnDestroy {
  @Input() public conBackground = '';

  public conversations$ = this.connectionsStoreFacadeService.selectConversations$;

  public subs = new Subscription();

  constructor(
    private currentElement: ElementRef,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.conversations$
        .pipe(map(conversations => conversations.map(user => user.companionID.S).includes(this.conBackground)))
        .subscribe(booleanValue => {
          booleanValue ? this.lightBackground() : this.nonlightBackground();
        })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private lightBackground(): void {
    (this.currentElement.nativeElement as HTMLElement).style.backgroundColor = '#da3879';
  }

  private nonlightBackground(): void {
    (this.currentElement.nativeElement as HTMLElement).style.backgroundColor = '';
  }
}
