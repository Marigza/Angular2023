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
  conversations: [],
  error: null,
  timerGroups: null,
  timerPeople: null,
  isLoading: false,
  isTimerGroupsLoading: false,
  isTimerPeopleLoading: false,
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
    mainActions.peopleUpdate,
    mainActions.createConversation,
    mainActions.conversationsRequestSend,
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
      conversations: [],
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
    mainActions.conversationsGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      conversations: response.Items,
      error: null,
      isLoading: false,
    })
  ),
  on(
    mainActions.createConversationSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      conversations: state.conversations.concat(response),
      error: null,
      isLoading: false,
    })
  ),
  on(
    loginActions.loginFail,
    registrationActions.registrationFail,
    mainActions.peopleGetFail,
    mainActions.groupsGetFail,
    mainActions.groupsUpdateFail,
    mainActions.peopleUpdateFail,
    mainActions.createGroupFail,
    mainActions.deleteGroupFail,
    mainActions.conversationsGetFail,
    mainActions.createConversationFail,
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
      timerGroups: 60,
      groups: response.Items,
      error: null,
      isTimerGroupsLoading: true,
      isLoading: false,
    })
  ),
  on(
    mainActions.peopleUpdateSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      timerPeople: 60,
      people: response.Items,
      error: null,
      isTimerPeopleLoading: true,
      isLoading: false,
    })
  ),
  on(
    mainActions.currentTimerGroups,
    (state, { time }): ConnectionStore => ({
      ...state,
      timerGroups: time,
    })
  ),
  on(
    mainActions.currentTimerPeople,
    (state, { time }): ConnectionStore => ({
      ...state,
      timerPeople: time,
    })
  ),
  on(
    mainActions.endTimerGroups,
    (state): ConnectionStore => ({
      ...state,
      timerGroups: null,
      isTimerGroupsLoading: false,
    })
  ),
  on(
    mainActions.endTimerPeople,
    (state): ConnectionStore => ({
      ...state,
      timerPeople: null,
      isTimerPeopleLoading: false,
    })
  )
);
