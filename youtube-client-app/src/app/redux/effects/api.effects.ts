import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { YoutubeHttpService } from '../../youtube/services/youtube-http.service';
import { youtubeApiActions } from '../actions/card-api.actions';

@Injectable()
export class ApiGetCardsEffects {
  public loadVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(youtubeApiActions.requestSend),
      exhaustMap(({ requestValue }) =>
        this.youtubeHttpService.get$(requestValue.toLowerCase().trim()).pipe(
          map(cards => youtubeApiActions.cardsLoadedSuccess({ cards })),
          catchError((error: Error) => of(youtubeApiActions.cardsLoadedFail({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private youtubeHttpService: YoutubeHttpService
  ) {}
}
