import { Injectable } from '@angular/core';

// import { map, filter } from 'rxjs';
import { DataFromHttpService } from './data-from-http.service';

// import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class FilterByValueService {
  public cards = this.dataFromHttpService.card$$;

  constructor(private dataFromHttpService: DataFromHttpService) {}

  // public filteringData(value: string): void {
  //   console.log(this.cards);
  //   if (this.cards) {
  //     this.cards.pipe(filter(card => card!.snippet.title.includes(value))
  //     ).subscribe(data => data);
  //     console.log(this.cards)
  //   }
  // }

  public filteringData2(value: string): void {
    this.cards.subscribe(data => {
      if (data) data.filter(card => card.snippet.title.toLowerCase().includes(value.toLowerCase()));
      // console.log(data2);
    });
  }
}
