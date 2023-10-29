import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { SearchItem } from 'src/app/shared/models/search-item.model';
import { DataHttpService } from 'src/app/shared/services/data-http.service';

@Injectable({
  providedIn: 'root',
})
export class DataFromHttpService {
  private card$ = new BehaviorSubject<SearchItem[] | null>(null);

  public card$$ = this.card$.asObservable(); // его можно фильровать и сортировка и поиск - отображение карточек текущих

  constructor(private dataHttpService: DataHttpService) {}

  public getCards(): void {
    this.dataHttpService
      .get()
      .pipe(map(({ items }) => items))
      .subscribe(data => {
        // items.filter... or operator filter
        this.updateData(data);
      });
  }

  private updateData(data: SearchItem[]): void {
    this.card$.next(data);
  }
}
