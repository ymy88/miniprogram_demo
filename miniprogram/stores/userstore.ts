import { observable, action } from 'mobx-miniprogram'

type UpdateAppUserInfoFn = ((userInfo: AppUserInfo) => void) & IAction;

export interface UserStoreData {
  appUserInfo?: AppUserInfo;
}

export interface UserStoreActions {
  updateAppUserInfo?: UpdateAppUserInfoFn
}

type UserStoreProps = UserStoreData & UserStoreActions;

export const userStore = observable<UserStoreProps>({

  appUserInfo: {},

  // actions
  updateAppUserInfo: action(function (userInfo: AppUserInfo) {
    console.log(userInfo);
    // @ts-ignore
    this.appUserInfo = userInfo;
  }),

})
