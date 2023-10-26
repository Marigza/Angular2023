import { Injectable } from '@angular/core';

import { mockresult } from '../../assets/search-result';
import { SearchItem } from './search-item.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public result: SearchItem[] = [];

  public getResult(): SearchItem[] {
    this.result = mockresult.items;

    return this.result;
  }
}
