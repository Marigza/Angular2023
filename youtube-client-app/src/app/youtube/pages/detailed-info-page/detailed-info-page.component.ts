import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { SearchItem } from '../../models/search-item.model';
import { DataFromHttpService } from '../../services/data-from-http.service';

@Component({
  selector: 'yta-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export class DetailedInfoPageComponent implements OnInit {
  public item: SearchItem | undefined;

  private items$: Observable<SearchItem[] | undefined> = this.dataFromHttpService.filteredCards$;

  constructor(
    private route: ActivatedRoute,
    private dataFromHttpService: DataFromHttpService
  ) {}

  public ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = routeParams.get('cardId');

    this.items$.subscribe(items => {
      const targetItem = items?.find(item => item.id === itemIdFromRoute);
      this.item = targetItem;

      return this.item;
    });
  }
}
