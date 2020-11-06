import { observable, action } from 'mobx-miniprogram'

type UpdateAppUserInfoFn = ((userInfo: AppUserInfo) => void) & IAction;
type ClearAppUserInfoFn = (() => void) & IAction;

export interface UserStoreData {
  readonly appUserInfo?: AppUserInfo;
}

export interface UserStoreActions {
  readonly updateAppUserInfo?: UpdateAppUserInfoFn,
  readonly clearAppUserInfo?: ClearAppUserInfoFn
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

  clearAppUserInfo: action(function () {
    console.log("Clear app user info")
    // @ts-ignore
    this.appUserInfo = {}
  })

})
