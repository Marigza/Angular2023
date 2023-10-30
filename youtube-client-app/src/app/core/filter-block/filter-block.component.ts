import { Component } from '@angular/core';

import { SortingService } from 'src/app/shared/services/sorting.service';

@Component({
  selector: 'yta-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  constructor(private sortingService: SortingService) {}

  public sortByViewCount(): void {
    this.sortingService.sortByViewCount();
  }

  public sortByData(): void {
    this.sortingService.sortByData();
  }
}
