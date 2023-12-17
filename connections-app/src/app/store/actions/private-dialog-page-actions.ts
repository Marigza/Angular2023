import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { MessageParams } from '../../core/models/message-params.model';
import { ResponseDialog } from '../../core/models/response-dialog.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ActionSource } from '../enum/action-source.enum';

export const privateDialogActions = createActionGroup({
  source: ActionSource.PrivateDialog,
  events: {
    'Private Dialog Data Get Success': props<{ response: ResponseDialog }>(),
    'Private Dialog Data Get Fail': props<{ error: HttpErrorResponse }>(),
    'Private Dialog Data Request Send': props<{ token: TokenParams; conversationId: string; since?: number }>(),
    'Private Dialog Data Update Request Send': props<{ token: TokenParams; conversationId: string; since?: number }>(),
    'Private Dialog Data Update Get Success': props<{ response: ResponseDialog }>(),
    'Private Dialog Data Update Get Fail': props<{ error: HttpErrorResponse }>(),
    'Private Dialog Add Message Request Send': props<{ token: TokenParams; conversationId: string; message: string }>(),
    'Private Dialog Add Message Success': props<{ message: MessageParams }>(),
    'Private Dialog Add Message Fail': props<{ error: HttpErrorResponse }>(),
    'Delete Private Dialog Request Send': props<{ token: TokenParams; conversationId: string }>(),
    'Delete Private Dialog Success': props<{ response: HttpStatusCode; conversationId: string }>(),
    'Delete Private Dialog Fail': props<{ error: HttpErrorResponse }>(),
    'Current Timer Private Dialog': props<{ time: number }>(),
    'End Timer Private Dialog': props<{ time: null }>(),
    'Go Away From Current Page': emptyProps(),
  },
});
