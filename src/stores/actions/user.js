import { SETUSER, SETNEWUSER, SETNEEDLOGIN } from '@stores/actionTypes';

export const updateUserInfo = (UserInfo) => ({
  type: SETUSER,
  UserInfo,
});

export const updateNewUser = (NewUser) => ({
  type: SETNEWUSER,
  NewUser,
});

export const updateNeedLogin = (isNeedLogin) => ({
  type: SETNEEDLOGIN,
  isNeedLogin,
});