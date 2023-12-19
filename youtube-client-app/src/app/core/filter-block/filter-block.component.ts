import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

import { FilterByValueService } from '../../youtube/services/filter-by-value.service';
import { SortingCardsService } from '../../youtube/services/sorting-cards.service';

@Component({
  selector: 'yta-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  public filter = this.formBuilder.group({
    filterControl: [''],
  });

  private sortDirection: number = 1;

  constructor(
    private sortingCardsService: SortingCardsService,
    private filterByValueService: FilterByValueService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  public sortByViewCount(): void {
    this.sortDirection *= -1;
    this.sortingCardsService.updateData({ sortType: 'view', sortDirection: this.sortDirection });
  }

  public sortByData(): void {
    this.sortDirection *= -1;
    this.sortingCardsService.updateData({ sortType: 'data', sortDirection: this.sortDirection });
  }

  public filterByInput(): void {
    this.filterByValue(this.filter.get('filterControl')?.value ?? '');
  }

  private filterByValue(value: string): void {
    this.filterByValueService.updateData(value);
  }
}
