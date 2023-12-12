import { createReducer, on } from '@ngrx/store';

import { TokenParams } from '../../core/models/token-params.model';
import { loginActions } from '../actions/login-page.actions';
import { mainActions } from '../actions/main-page.actions';
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
  groups: [],
  people: [],
  error: null,
  timer: null,
  isLoading: false,
  isTimerLoading: false,
};

export const connectionFeatureKey = 'connectionStore';

export const profileReducer = createReducer(
  initialState,
  on(
    loginActions.loginRequestSend,
    registrationActions.registrationRequestSend,
    mainActions.peopleRequestSend,
    mainActions.groupsRequestSend,
    mainActions.createGroup,
    mainActions.deleteGroup,
    mainActions.groupsUpdate,
    profileActions.profileRequestSend,
    profileActions.profileUpdateRequest,
    profileActions.profileLogoutSend,
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
  on(
    registrationActions.registrationSuccess,
    (state): ConnectionStore => ({ ...state, isLoading: false, error: null })
  ),
  on(
    profileActions.profileUpdateSuccess,
    (state, { name }): ConnectionStore => ({
      ...state,
      profile: Object.defineProperty(structuredClone(state.profile), 'name', { value: { S: name } }),
      isLoading: false,
      error: null,
    })
  ),
  on(
    profileActions.profileLogoutSuccess,
    (state): ConnectionStore => ({
      ...state,
      token: null,
      profile: null,
      groups: [],
      people: [],
      isLoading: false,
      error: null,
    })
  ),
  on(
    mainActions.groupsGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      isLoading: false,
      groups: response.Items,
      error: null,
    })
  ),
  on(
    mainActions.createGroupSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      groups: state.groups.concat(response),
      isLoading: false,
      error: null,
    })
  ),
  on(
    mainActions.deleteGroupSuccess,
    (state, { group }): ConnectionStore => ({
      ...state,
      groups: state.groups.filter(({ id }) => id.S !== group),
      isLoading: false,
      error: null,
    })
  ),
  on(
    mainActions.peopleGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      isLoading: false,
      people: response.Items,
      error: null,
    })
  ),
  on(
    loginActions.loginFail,
    registrationActions.registrationFail,
    mainActions.peopleGetFail,
    mainActions.groupsGetFail,
    mainActions.groupsUpdateFail,
    mainActions.createGroupFail,
    mainActions.deleteGroupFail,
    profileActions.profileInfoGetFail,
    profileActions.profileUpdateFail,
    profileActions.profileLogoutFail,
    (state, err): ConnectionStore => ({
      ...state,
      isLoading: false,
      error: err.error.message,
    })
  ),
  on(
    mainActions.groupsUpdateSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      timer: 60,
      groups: response.Items,
      error: null,
      isTimerLoading: true,
      isLoading: false,
    })
  ),
  on(
    mainActions.currentTimer,
    (state, { time }): ConnectionStore => ({
      ...state,
      timer: time,
    })
  ),
  on(
    mainActions.endTimer,
    (state): ConnectionStore => ({
      ...state,
      timer: null,
      isTimerLoading: false,
    })
  )
);
