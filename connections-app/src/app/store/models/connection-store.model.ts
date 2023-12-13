import { ConversationParams } from '../../core/models/conversation-params.model';
import { GroupParams } from '../../core/models/group-params.model';
import { PeopleParams } from '../../core/models/people-params.model';
import { ProfileParams } from '../../core/models/profile-params.model';
import { TokenParams } from '../../core/models/token-params.model';

export interface ConnectionStore {
  token: TokenParams | null;
  profile: ProfileParams | null;
  groups: GroupParams[];
  people: PeopleParams[];
  conversations: ConversationParams[];
  error: string | null;
  timerGroups: number | null;
  timerPeople: number | null;
  isLoading: boolean;
  isTimerGroupsLoading: boolean;
  isTimerPeopleLoading: boolean;
}
