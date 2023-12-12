import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';

import { GroupParams } from '../../core/models/group-params.model';
import { ResponseGroups } from '../../core/models/response-groups.model';
import { ResponsePeople } from '../../core/models/response-people.model';
import { TokenParams } from '../../core/models/token-params.model';
import { ActionSource } from '../enum/action-source.enum';

export const mainActions = createActionGroup({
  source: ActionSource.Main,
  events: {
    'Groups Get Success': props<{ response: ResponseGroups }>(),
    'Groups Get Fail': props<{ error: HttpErrorResponse }>(),
    'Groups Request Send': props<{ token: TokenParams }>(),
    'People Get Success': props<{ response: ResponsePeople }>(),
    'People Get Fail': props<{ error: HttpErrorResponse }>(),
    'People Request Send': props<{ token: TokenParams }>(),
    'Create Group': props<{ token: TokenParams; name: string }>(),
    'Create Group Success': props<{ response: GroupParams }>(),
    'Create Group Fail': props<{ error: HttpErrorResponse }>(),
    'Delete Group': props<{ token: TokenParams; group: string }>(),
    'Delete Group Success': props<{ response: HttpStatusCode; group: string }>(),
    'Delete Group Fail': props<{ error: HttpErrorResponse }>(),
  },
});
