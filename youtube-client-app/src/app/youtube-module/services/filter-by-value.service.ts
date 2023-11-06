import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterByValueService {
  private filterParameter$$ = new BehaviorSubject<string>('');

  public filterParameter$ = this.filterParameter$$.asObservable();

  public updateData(data: string): void {
    this.filterParameter$$.next(data);
  }
}
