import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { filter, map, Subscription, take } from 'rxjs';

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

  public regExpAnyChar = '(^.*[^ A-zА-яЁё].*$)';

  public profile = this.formBuilder.group({
    name: ['', [Validators.required, this.anyCharValidator()]],
  });

  public subs = new Subscription();

  private userToken: TokenParams | null = null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService
  ) {}

  public ngOnInit(): void {
    this.connectionsStoreFacadeService.selectToken$.pipe(filter(Boolean), take(1)).subscribe(userToken => {
      this.userToken = userToken;
    });

    this.subs.add(
      this.connectionsStoreFacadeService.selectProfile$
        .pipe(
          map(profile => {
            if (profile) return;

            if (!this.userToken) return;

            this.connectionsStoreFacadeService.profileRequestSend(this.userToken);
          })
        )
        .subscribe()
    );
  }

  public updateProfile(): void {
    const name = this.profile.get('name')?.value ?? '';

    this.userToken && this.connectionsStoreFacadeService.profileUpdateRequest(this.userToken, name);
  }

  public toggleRedact(): void {
    this.canRedact = !this.canRedact;
  }

  public logout(): void {
    this.userToken && this.connectionsStoreFacadeService.profileLogoutSend(this.userToken);
  }

  public anyCharValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const inputName = control.value;

      return inputName.match(this.regExpAnyChar) ? { name: true } : null;
    };
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
