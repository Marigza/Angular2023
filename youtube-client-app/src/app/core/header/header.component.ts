import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ActionsWithTokenService } from 'src/app/auth/services/actions-with-token.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CardsStateService } from 'src/app/youtube/services/cards-state.service';

@Component({
  selector: 'yta-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public searchControl = new FormControl('');

  public isShownSettings = false;

  public isLogged = this.authService.isLoggedIn;

  constructor(
    private router: Router,
    private cardsStateService: CardsStateService,
    private actionsWithTokenService: ActionsWithTokenService,
    private authService: AuthService
  ) {}

  public toggleSettingsVisibility(): void {
    this.isShownSettings = !this.isShownSettings;
  }

  public showCards(): void {
    this.cardsStateService.getCards();
    this.cardsStateService.getFilteredValue();
  }

  public logOut(): Promise<boolean> {
    this.actionsWithTokenService.removeToken();
    this.authService.logout();
    this.isLogged = this.authService.isLoggedIn;

    return this.router.navigate(['/auth']);
  }
}
