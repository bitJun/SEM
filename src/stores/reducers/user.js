import { SETUSER, SETNEWUSER, SETNEEDLOGIN } from '@stores/actionTypes';
import {
	getStorageSync
} from '@utils/util';

export const initialState = {
  UserInfo: getStorageSync('UserInfo') || {},
  NewUser: false,
  isNeedLogin: false,
};

function user(state = initialState, actions) {
  // console.log('actions', actions)
  switch (actions.type) {
    case SETUSER:
      return {
        ...state,
        UserInfo: actions.UserInfo,
      };
    case SETNEWUSER:
      return {
        ...state,
        NewUser: actions.NewUser
      }
    case SETNEEDLOGIN:
      return {
        ...state,
        isNeedLogin: actions.isNeedLogin
      }
    default:
      return state;
  }
}
export default user;