import { Component } from '@angular/core';

import { CardsStateService } from '../../youtube/services/cards-state.service';

@Component({
  selector: 'yta-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isShownSettings = false;

  constructor(private cardsStateService: CardsStateService) {}

  public toggleSettingsVisibility(): void {
    this.isShownSettings = !this.isShownSettings;
  }

  public showCards(): void {
    this.cardsStateService.getCards();
    this.cardsStateService.getFilteredValue();
  }
}
