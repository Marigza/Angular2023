import { createReducer, on } from '@ngrx/store';

// import { ProfileParams } from '../../core/models/profile-params.model';
// import { TokenParams } from '../../core/models/token-params.model';
import { loginActions } from '../actions/login-page.actions';
// import { profileActions } from '../actions/profile-page.actions';
import { registrationActions } from '../actions/registration-page.actions';
import { ConnectionStore } from '../models/connection-store.model';

export const initialState: ConnectionStore = {
  token: null,
  profile: null,
  error: null,
  isLoading: false,
};

export const connectionFeatureKey = 'connectionStore';

export const profileReducer = createReducer(
  initialState,
  on(loginActions.loginRequestSend, registrationActions.registrationRequestSend, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(loginActions.loginSuccess, (state, { response, email }) => ({
    ...state,
    token: { uid: response.uid, email, token: response.token },
    isLoading: false,
    error: null,
  })),
  on(registrationActions.registrationSuccess, state => ({ ...state, isLoading: false })),
  on(loginActions.loginFail, registrationActions.registrationFail, (state, err) => ({
    ...state,
    isLoading: false,
    error: err.error.message,
  }))
);
