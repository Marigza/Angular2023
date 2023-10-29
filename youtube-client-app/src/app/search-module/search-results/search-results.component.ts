import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DataFromHttpService } from '../../shared/services/data-from-http.service';
import { SearchItem } from '../search-item.model';

@Component({
  selector: 'yta-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  public cards$: Observable<SearchItem[] | null> = this.dataFromHttpService.card$$;

  constructor(public dataFromHttpService: DataFromHttpService) {}
}
