import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { SearchItem } from 'src/app/shared/models/search-item.model';
import { DataHttpService } from 'src/app/shared/services/data-http.service';

@Injectable({
  providedIn: 'root',
})
export class DataFromHttpService {
  private card$ = new BehaviorSubject<SearchItem[] | null>(null);

  public card$$ = this.card$.asObservable();

  constructor(private dataHttpService: DataHttpService) {}

  public getCards(): void {
    this.dataHttpService
      .get()
      .pipe(map(({ items }) => items))
      .subscribe(data => {
        this.updateData(data);
      });
  }

  // public getCards2(value: string): void {
  //   this.dataHttpService
  //     .get()
  //     .pipe(
  //       map(({ items }) => items),
  //       filter(item => item.snippet.title.toLowerCase().includes(value.toLowerCase()))
  //     ).subscribe(data => {
  //       this.updateData(data);
  //     });
  // }

  private updateData(data: SearchItem[]): void {
    this.card$.next(data);
  }
}
