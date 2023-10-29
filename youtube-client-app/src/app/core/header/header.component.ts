import { Component } from '@angular/core';

import { DataFromHttpService } from '../../shared/services/data-from-http.service';

@Component({
  selector: 'yta-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dataFromHttpService: DataFromHttpService) {}

  // showSettings() {
  //   console.log('settings')
  // }

  public showCards(): void {
    this.dataFromHttpService.getCards();
  }
}
