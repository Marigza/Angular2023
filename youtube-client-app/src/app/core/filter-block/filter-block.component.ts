import { Component } from '@angular/core';

import { FilterByValueService } from '../../shared/services/filter-by-value.service';
import { SortingService } from '../../shared/services/sorting.service';

@Component({
  selector: 'yta-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  constructor(
    private sortingService: SortingService,
    private filterByValueService: FilterByValueService
  ) {}

  public sortByViewCount(): void {
    this.sortingService.sortByViewCount();
  }

  public sortByData(): void {
    this.sortingService.sortByData();
  }

  public filterByValue(value: string): void {
    // console.log(value);
    this.filterByValueService.filteringData2(value);
  }
}
