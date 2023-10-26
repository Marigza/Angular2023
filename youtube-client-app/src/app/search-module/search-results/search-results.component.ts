import { Component, Input, OnChanges } from '@angular/core';

import { SearchItem } from '../search-item.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'yta-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges {
  public searchResult: SearchItem[] = [];

  @Input() public isShown = false;

  constructor(private searchService: SearchService) {}

  public ngOnChanges(): void {
    if (this.isShown) this.showItems();
  }

  public showItems(): void {
    this.searchResult = this.searchService.getResult();
  }
}
