import { ConversationParams } from '../../core/models/conversation-params.model';
import { GroupParams } from '../../core/models/group-params.model';
import { MessageParams } from '../../core/models/message-params.model';
import { PeopleParams } from '../../core/models/people-params.model';
import { ProfileParams } from '../../core/models/profile-params.model';
import { TokenParams } from '../../core/models/token-params.model';

// import { UniqueGroup } from '../../core/models/unique-group-params.model';
// import { UniqueConversation } from '../../core/models/unique-conversation-params.model';

export interface ConnectionStore {
  token: TokenParams | null;
  profile: ProfileParams | null;
  groups: GroupParams[];
  people: PeopleParams[];
  groupDialog: MessageParams[];
  privateDialog: MessageParams[];
  conversations: ConversationParams[];
  error: string | null;
  timerGroups: number | null;
  timerPeople: number | null;
  timerGroupDialog: number | null;
  timerPrivateDialog: number | null;
  isLoading: boolean;
  isTimerGroupsLoading: boolean;
  isTimerPeopleLoading: boolean;
  isTimerGroupDialogLoading: boolean;
  isTimerPrivateDialogLoading: boolean;
}
