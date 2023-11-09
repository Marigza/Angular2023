import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { CardsStateService } from 'src/app/youtube/services/cards-state.service';

@Component({
  selector: 'yta-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  public searchControl = new FormControl('');

  public isShownSettings = false;

  public isLogged = this.authService.isLoggedIn;

  constructor(
    private router: Router,
    private cardsStateService: CardsStateService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.traceLoginState();
  }

  public toggleSettingsVisibility(): void {
    this.isShownSettings = !this.isShownSettings;
  }

  public showCards(): void {
    this.cardsStateService.getCards();
    this.cardsStateService.getFilteredValue();
  }

  public logOut(): Promise<boolean> {
    this.authService.logout();
    this.traceLoginState();

    return this.router.navigate(['/auth']);
  }

  private traceLoginState(): void {
    this.authService.logState$.subscribe({
      next: v => {
        this.isLogged = v;
      },
    });
  }

  public ngOnDestroy(): void {
    this.authService.logState$.unsubscribe();
  }
}
