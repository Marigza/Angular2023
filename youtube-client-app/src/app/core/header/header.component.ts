import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter, Subscription } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';
import { CardsStoreFacadeService } from '../../shared/services/cards-store-facade.service';

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
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cardsStoreFacadeService: CardsStoreFacadeService
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
          this.cardsStoreFacadeService.requestSendAction(value);
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

  public showCardCreation(): Promise<boolean> {
    return this.router.navigate(['/youtube/admin']);
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
