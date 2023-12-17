import { createReducer, on } from '@ngrx/store';

import { TokenParams } from '../../core/models/token-params.model';
import { groupDialogActions } from '../actions/group-dialog-page.actions';
import { loginActions } from '../actions/login-page.actions';
import { mainActions } from '../actions/main-page.actions';
import { privateDialogActions } from '../actions/private-dialog-page-actions';
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
  groupDialog: [],
  privateDialog: [],
  error: null,
  timerGroups: null,
  timerPeople: null,
  timerGroupDialog: null,
  timerPrivateDialog: null,
  isLoading: false,
  isTimerGroupsLoading: false,
  isTimerPeopleLoading: false,
  isTimerGroupDialogLoading: false,
  isTimerPrivateDialogLoading: false,
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
    groupDialogActions.groupDialogDataRequestSend,
    groupDialogActions.groupDialogDataUpdateRequestSend,
    groupDialogActions.deleteGroupDialogRequestSend,
    groupDialogActions.groupDialogAddMessageRequestSend,
    privateDialogActions.privateDialogDataRequestSend,
    privateDialogActions.privateDialogDataUpdateRequestSend,
    privateDialogActions.deletePrivateDialogRequestSend,
    privateDialogActions.privateDialogAddMessageRequestSend,
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
    groupDialogActions.deleteGroupDialogSuccess,
    (state, { groupId }): ConnectionStore => ({
      ...state,
      groups: state.groups.filter(({ id }) => id.S !== groupId),
      error: null,
      isLoading: false,
    })
  ),
  on(
    groupDialogActions.groupDialogAddMessageSuccess,
    (state, { message }): ConnectionStore => ({
      ...state,
      groupDialog: state.groupDialog.concat(message),
      error: null,
      isLoading: false,
    })
  ),
  on(
    groupDialogActions.groupDialogDataGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      groupDialog: response.Items, // TODO как быть при открытии другой группы?
      error: null,
      isLoading: false,
    })
  ),
  on(
    groupDialogActions.groupDialogDataUpdateGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      groupDialog: response.Items,
      error: null,
      isLoading: false,
    })
  ),
  on(
    privateDialogActions.deletePrivateDialogSuccess,
    (state, { conversationId }): ConnectionStore => ({
      ...state,
      conversations: state.conversations.filter(({ id }) => id.S !== conversationId),
      error: null,
      isLoading: false,
    })
  ),
  on(
    privateDialogActions.privateDialogAddMessageSuccess,
    (state, { message }): ConnectionStore => ({
      ...state,
      privateDialog: state.privateDialog.concat(message),
      error: null,
      isLoading: false,
    })
  ),
  on(
    privateDialogActions.privateDialogDataGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      privateDialog: response.Items,
      error: null,
      isLoading: false,
    })
  ),
  on(
    privateDialogActions.privateDialogDataUpdateGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      privateDialog: response.Items,
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
    groupDialogActions.groupDialogDataGetFail,
    groupDialogActions.groupDialogDataUpdateGetFail,
    groupDialogActions.groupDialogAddMessageFail,
    groupDialogActions.deleteGroupDialogFail,
    privateDialogActions.privateDialogDataGetFail,
    privateDialogActions.privateDialogDataUpdateGetFail,
    privateDialogActions.deletePrivateDialogFail,
    privateDialogActions.privateDialogAddMessageFail,
    (state, err): ConnectionStore => ({
      ...state,
      isLoading: false,
      error: err.error.message,
    })
  ),
  // TODO временное решение для сообщений в чатах. Пока не прописала логику с sinse параметром
  on(
    privateDialogActions.goAwayFromCurrentPage,
    (state): ConnectionStore => ({
      ...state,
      privateDialog: [],
    })
  ),
  on(
    groupDialogActions.goAwayFromCurrentPage,
    (state): ConnectionStore => ({
      ...state,
      groupDialog: [],
    })
  ),
  // конец временное решение
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
    groupDialogActions.groupDialogDataUpdateGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      timerGroupDialog: 60,
      groupDialog: response.Items,
      error: null,
      isTimerGroupDialogLoading: true,
      isLoading: false,
    })
  ),
  on(
    privateDialogActions.privateDialogDataUpdateGetSuccess,
    (state, { response }): ConnectionStore => ({
      ...state,
      timerPrivateDialog: 60,
      privateDialog: response.Items,
      error: null,
      isTimerPrivateDialogLoading: true,
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
    groupDialogActions.currentTimerGroupDialog,
    (state, { time }): ConnectionStore => ({
      ...state,
      timerGroupDialog: time,
    })
  ),
  on(
    privateDialogActions.currentTimerPrivateDialog,
    (state, { time }): ConnectionStore => ({
      ...state,
      timerPrivateDialog: time,
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
  ),
  on(
    groupDialogActions.endTimerGroupDialog,
    (state): ConnectionStore => ({
      ...state,
      timerGroupDialog: null,
      isTimerGroupDialogLoading: false,
    })
  ),
  on(
    privateDialogActions.endTimerPrivateDialog,
    (state): ConnectionStore => ({
      ...state,
      timerPrivateDialog: null,
      isTimerPrivateDialogLoading: false,
    })
  )
);
