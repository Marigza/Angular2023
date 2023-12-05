import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';

import { TokenParams } from '../../core/models/token-params.model';
import { ConnectionsHttpService } from '../../core/services/connections-http.service';

@Component({
  selector: 'con-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public canRedact = false;

  public profile = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private connectionsHttpService: ConnectionsHttpService,
    // private router: Router,
    // private authService: AuthService,
    private formBuilder: NonNullableFormBuilder
  ) {
    this.showProfile();
  }

  // public async onSubmit(): Promise<void> {
  //   this.emailFormField?.value && this.authService.login(this.emailFormField?.value);
  //   await this.router.navigate(['/youtube']);
  // }

  public showProfile(): void {
    const token: TokenParams = {
      // заменить получением токена
      'rs-uid': 'iptcfxklsv7',
      'rs-email': 'test',
      Authorization: 'snxq183xbql',
    };
    this.connectionsHttpService.getProfile$(token).subscribe(res => res);
    //  console.log(res);
    // убрать эту бобуйню;
  }

  public toggleRedact(): void {
    this.canRedact = !this.canRedact;
  }

  private get emailFormField(): AbstractControl<string> | null {
    return this.profile.get('email');
  }
}
