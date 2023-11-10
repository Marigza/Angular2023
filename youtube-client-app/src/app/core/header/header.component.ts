import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { CardsStateService } from 'src/app/youtube/services/cards-state.service';

@Component({
  selector: 'yta-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  public searchForm = this.formBuilder.group({
    searchControl: [''],
  });

  public isShownSettings = false;

  public isLogged = this.authService.isLoggedIn;

  constructor(
    private router: Router,
    private cardsStateService: CardsStateService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.traceLoginState();
    this.searchForm
      .get('searchControl')
      ?.valueChanges.pipe(
        debounceTime(1500),
        filter(Boolean),
        filter(value => value.length > 2)
      )
      .subscribe(value => {
        this.cardsStateService.getCards(value.toLowerCase());
        this.cardsStateService.getFilteredValue();
      });
  }

  public toggleSettingsVisibility(): void {
    this.isShownSettings = !this.isShownSettings;
  }

  public logOut(): Promise<boolean> {
    this.authService.logout();
    this.traceLoginState();

    return this.router.navigate(['/auth']);
  }

  private traceLoginState(): void {
    this.authService.logState$.subscribe({
      // убрать next
      next: v => {
        this.isLogged = v;
      },
    });
  }

  public ngOnDestroy(): void {
    this.authService.logState$.unsubscribe();
  }
}
