import { Component } from '@angular/core';

import { FilterByValueService } from '../../youtube/services/filter-by-value.service';
import { SortingCardsService } from '../../youtube/services/sorting-cards.service';

@Component({
  selector: 'yta-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  private sortNumber: number = 1;

  constructor(
    private sortingCardsService: SortingCardsService,
    private filterByValueService: FilterByValueService
  ) {}

  public sortByViewCount(): void {
    this.sortNumber *= -1;
    this.sortingCardsService.updateData({ sortType: 'view', sortNumber: this.sortNumber });
  }

  public sortByData(): void {
    this.sortNumber *= -1;
    this.sortingCardsService.updateData({ sortType: 'data', sortNumber: this.sortNumber });
  }

  public filterByValue(value: string): void {
    this.filterByValueService.updateData(value);
  }
}
