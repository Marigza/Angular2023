import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsHttpService } from '../../core/services/connections-http.service';
import { ConnectionsStoreFacadeService } from '../../shared/services/connections-store-facade.service';

@Component({
  selector: 'con-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public profileParam$ = this.connectionsStoreFacadeService.selectProfile$;

  public isDisabled$ = this.connectionsStoreFacadeService.isLoading$;

  public canRedact = false;

  public profile = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private connectionsHttpService: ConnectionsHttpService,
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private connectionsStoreFacadeService: ConnectionsStoreFacadeService
  ) {
    this.profileParam$.subscribe(value => {
      if (value === null) this.showProfile();
    });
  }

  public showProfile(): void {
    this.connectionsStoreFacadeService.selectToken$.subscribe(token => {
      token && this.connectionsStoreFacadeService.profileRequestSend(token);
    });
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

  // public logout(): void {
  // const token: TokenParams = {
  //   uid: localStorage.getItem('uid') ?? '',
  //   email: localStorage.getItem('email') ?? '',
  //   token: localStorage.getItem('token') ?? '',
  // };
  // this.connectionsHttpService.logout$(token).subscribe(() => {
  //   this.router.navigate(['/signin']);
  //   localStorage.clear();
  // });
  // }
}
