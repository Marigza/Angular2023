import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter, Subscription } from 'rxjs';

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

  public subs = new Subscription();

  constructor(
    private router: Router,
    private cardsStateService: CardsStateService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.authService.logState$.subscribe(booleanValue => {
        this.isLogged = booleanValue;
      })
    );
    this.subs.add(
      this.searchForm
        .get('searchControl')
        ?.valueChanges.pipe(
          debounceTime(1500),
          filter(Boolean),
          filter(value => value.length > 2)
        )
        .subscribe(value => {
          // передать значение в поле класса и к нему подписаться. вместо вложенной подписки
          this.cardsStateService.getCards$(value).subscribe(dataWithVideo => {
            this.cardsStateService.updateData(dataWithVideo);
          });
          this.cardsStateService.getFilteredValue();
        })
    );
  }

  public toggleSettingsVisibility(): void {
    this.isShownSettings = !this.isShownSettings;
  }

  public logOut(): Promise<boolean> {
    this.authService.logout();

    return this.router.navigate(['/auth']);
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
