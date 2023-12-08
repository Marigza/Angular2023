import { createReducer, on } from '@ngrx/store';

import { TokenParams } from '../../core/models/token-params.model';
import { loginActions } from '../actions/login-page.actions';
import { profileActions } from '../actions/profile-page.actions';
import { registrationActions } from '../actions/registration-page.actions';
import { ConnectionStore } from '../models/connection-store.model';

const tokenInfo: TokenParams = {
  uid: localStorage.getItem('uid') ?? '',
  email: localStorage.getItem('email') ?? '',
  token: localStorage.getItem('token') ?? '',
};

export const initialState: ConnectionStore = {
  token: tokenInfo,
  profile: null,
  error: null,
  isLoading: false,
};

export const connectionFeatureKey = 'connectionStore';

export const profileReducer = createReducer(
  initialState,
  on(
    loginActions.loginRequestSend,
    registrationActions.registrationRequestSend,
    profileActions.profileRequestSend,
    (state): ConnectionStore => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    loginActions.loginSuccess,
    (state, { response, email }): ConnectionStore => ({
      ...state,
      token: { uid: response.uid, email, token: response.token },
      isLoading: false,
      error: null,
    })
  ),
  on(
    profileActions.profileInfoGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      profile: response,
      isLoading: false,
      error: null,
    })
  ),
  on(registrationActions.registrationSuccess, (state): ConnectionStore => ({ ...state, isLoading: false })),
  on(
    loginActions.loginFail,
    registrationActions.registrationFail,
    profileActions.profileInfoGetFail,
    (state, err): ConnectionStore => ({
      ...state,
      isLoading: false,
      error: err.error.message,
    })
  )
);
