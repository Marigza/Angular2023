import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';

import { ConversationParams } from '../../core/models/conversation-params.model';
import { GroupParams } from '../../core/models/group-params.model';
import { ResponseConversationsList } from '../../core/models/response-conversations-list.model';
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
    'Groups Update Success': props<{ response: ResponseGroups }>(),
    'Groups Update Fail': props<{ error: HttpErrorResponse }>(),
    'Groups Update': props<{ token: TokenParams }>(),

    'People Get Success': props<{ response: ResponsePeople }>(),
    'People Get Fail': props<{ error: HttpErrorResponse }>(),
    'People Request Send': props<{ token: TokenParams }>(),
    'People Update': props<{ token: TokenParams }>(),
    'People Update Success': props<{ response: ResponsePeople }>(),
    'People Update Fail': props<{ error: HttpErrorResponse }>(),

    'Create Group': props<{ token: TokenParams; name: string }>(),
    'Create Group Success': props<{ response: GroupParams }>(),
    'Create Group Fail': props<{ error: HttpErrorResponse }>(),
    'Delete Group': props<{ token: TokenParams; group: string }>(),
    'Delete Group Success': props<{ response: HttpStatusCode; group: string }>(),
    'Delete Group Fail': props<{ error: HttpErrorResponse }>(),

    'Current Timer Groups': props<{ time: number }>(),
    'End Timer Groups': props<{ time: null }>(),
    'Current Timer People': props<{ time: number }>(),
    'End Timer People': props<{ time: null }>(),

    'Create Conversation': props<{ token: TokenParams; user: string }>(),
    'Create Conversation Success': props<{ response: ConversationParams }>(),
    'Create Conversation Fail': props<{ error: HttpErrorResponse }>(),
    'Conversations Request Send': props<{ token: TokenParams }>(),
    'Conversations Get Success': props<{ response: ResponseConversationsList }>(),
    'Conversations Get Fail': props<{ error: HttpErrorResponse }>(),
  },
});
