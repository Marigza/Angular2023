import { Component } from '@angular/core';

import { DataFromHttpService } from '../../shared/services/data-from-http.service';

@Component({
  selector: 'yta-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isShownSettings = false;

  constructor(private dataFromHttpService: DataFromHttpService) {}

  public toggleSettingsVisibility(): void {
    this.isShownSettings = !this.isShownSettings;
  }

  public showCards(): void {
    this.dataFromHttpService.getCards();
    this.dataFromHttpService.getFilteredValue();
  }
}
