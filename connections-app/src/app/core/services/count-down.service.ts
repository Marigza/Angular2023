import { Injectable } from '@angular/core';
import { scan, takeWhile, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountDownService {
  public timer$ = timer(0, 1000).pipe(
    scan(ticks => ticks - 1, 60),
    takeWhile(value => value >= 0)
  );
}
