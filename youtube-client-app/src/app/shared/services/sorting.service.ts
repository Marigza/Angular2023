import { Injectable } from '@angular/core';

import { DataFromHttpService } from './data-from-http.service';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  public cards = this.dataFromHttpService.card$$;

  public isAscendingView = true;

  public isAscendingData = true;

  constructor(private dataFromHttpService: DataFromHttpService) {}

  public sortByViewCount(): void {
    if (this.isAscendingView) {
      this.sortingViewCount(1);
      this.isAscendingView = !this.isAscendingView;
    } else {
      this.sortingViewCount(-1);
      this.isAscendingView = !this.isAscendingView;
    }
  }

  public sortByData(): void {
    if (this.isAscendingData) {
      this.sortingData(-1);
      this.isAscendingData = !this.isAscendingData;
    } else {
      this.sortingData(1);
      this.isAscendingData = !this.isAscendingData;
    }
  }

  private sortingData(asc: number): void {
    this.cards.subscribe(data => {
      if (data) data.sort((a, b) => (Date.parse(a.snippet.publishedAt) - Date.parse(b.snippet.publishedAt)) * asc);
    });
  }

  private sortingViewCount(asc: number): void {
    this.cards.subscribe(data => {
      if (data) data.sort((a, b) => (Number(a.statistics.viewCount) - Number(b.statistics.viewCount)) * asc);
    });
  }
}
