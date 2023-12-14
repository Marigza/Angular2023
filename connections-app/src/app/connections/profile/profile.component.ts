import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { exhaustMap, filter, map, Subscription } from 'rxjs';

import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Component({
  selector: 'con-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profileParam$ = this.connectionsStoreFacadeService.selectProfile$;

  public isDisabled$ = this.connectionsStoreFacadeService.isLoading$;

  public canRedact = false;

  public profile = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  public subs = new Subscription();

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.connectionsStoreFacadeService.selectProfile$
        .pipe(
          filter(profileParams => profileParams === null),
          exhaustMap(() => this.connectionsStoreFacadeService.selectToken$),
          map(token => {
            token && this.connectionsStoreFacadeService.profileRequestSend(token);
          })
        )
        .subscribe(data => data)
    );
  }

  public updateProfile(): void {
    const name = this.profile.get('name')?.value ?? '';
    this.connectionsStoreFacadeService.selectToken$.subscribe(token => {
      token && this.connectionsStoreFacadeService.profileUpdateRequest(token, name);
    });
  }

  public toggleRedact(): void {
    this.canRedact = !this.canRedact;
  }

  public logout(): void {
    // TODO сделать нормальную подгрузку из стора
    // this.connectionsStoreFacadeService.selectToken$.subscribe(token => {
    //   token && this.connectionsStoreFacadeService.profileLogoutSend(token);
    // })
    const token: TokenParams = {
      uid: localStorage.getItem('uid') ?? '',
      email: localStorage.getItem('email') ?? '',
      token: localStorage.getItem('token') ?? '',
    };
    this.connectionsStoreFacadeService.profileLogoutSend(token);
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
