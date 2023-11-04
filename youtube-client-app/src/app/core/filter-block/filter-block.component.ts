import { Component } from '@angular/core';

import { FilterByValueService } from '../../youtube/services/filter-by-value.service';
import { SortingService } from '../../youtube/services/sorting.service';

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
    this.sortingService.updateData('view');
  }

  public sortByData(): void {
    this.sortingService.updateData('data');
  }

  public filterByValue(value: string): void {
    this.filterByValueService.updateData(value);
  }
}
