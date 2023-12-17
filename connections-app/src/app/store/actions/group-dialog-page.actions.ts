import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { MessageParams } from '../../core/models/message-params.model';
import { ResponseDialog } from '../../core/models/response-dialog.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ActionSource } from '../enum/action-source.enum';

export const groupDialogActions = createActionGroup({
  source: ActionSource.GroupDialog,
  events: {
    'Group Dialog Data Get Success': props<{ response: ResponseDialog }>(),
    'Group Dialog Data Get Fail': props<{ error: HttpErrorResponse }>(),
    'Group Dialog Data Request Send': props<{ token: TokenParams; groupId: string; since?: number }>(),
    'Group Dialog Data Update Request Send': props<{ token: TokenParams; groupId: string; since?: number }>(),
    'Group Dialog Data Update Get Success': props<{ response: ResponseDialog }>(),
    'Group Dialog Data Update Get Fail': props<{ error: HttpErrorResponse }>(),
    'Group Dialog Add Message Request Send': props<{ token: TokenParams; groupId: string; message: string }>(),
    'Group Dialog Add Message Success': props<{ message: MessageParams }>(),
    'Group Dialog Add Message Fail': props<{ error: HttpErrorResponse }>(),
    'Delete Group Dialog Request Send': props<{ token: TokenParams; groupId: string }>(),
    'Delete Group Dialog Success': props<{ response: HttpStatusCode; groupId: string }>(),
    'Delete Group Dialog Fail': props<{ error: HttpErrorResponse }>(),
    'Current Timer Group Dialog': props<{ time: number }>(),
    'End Timer Group Dialog': props<{ time: null }>(),
    'Go Away From Current Page': emptyProps(),
  },
});
