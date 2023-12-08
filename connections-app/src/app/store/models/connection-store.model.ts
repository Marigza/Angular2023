import { ProfileParams } from '../../core/models/profile-params.model';
import { TokenParams } from '../../core/models/token-params.model';

export interface ConnectionStore {
  token: TokenParams | null;
  profile: ProfileParams | null;
  error: string | null;
  isLoading: boolean;
}
