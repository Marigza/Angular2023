import { GroupParams } from '../../core/models/group-params.model';
import { PeopleParams } from '../../core/models/people-params.model';
import { ProfileParams } from '../../core/models/profile-params.model';
import { TokenParams } from '../../core/models/token-params.model';

export interface ConnectionStore {
  token: TokenParams | null;
  profile: ProfileParams | null;
  groups: GroupParams[];
  people: PeopleParams[];
  error: string | null;
  timer: number | null;
  isLoading: boolean;
  isTimerLoading: boolean;
}