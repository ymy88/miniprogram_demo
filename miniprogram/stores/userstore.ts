import { observable, action } from 'mobx-miniprogram'

type UpdateAppUserInfoFn = ((userInfo: AppUserInfo) => void) & IAction;
type ClearAppUserInfoFn = (() => void) & IAction;
type UpdateWxUserInfoFn = ((userInfo: WxUserInfo) => void) & IAction;
type ClearWxUserInfoFn = (() => void) & IAction;

export interface UserStoreData {
  appUserInfo?: AppUserInfo | null;
  wxUserInfo?: WxUserInfo | null;
}

export interface UserStoreActions {
  readonly updateAppUserInfo?: UpdateAppUserInfoFn & ThisType<UserStoreData>,
  readonly clearAppUserInfo?: ClearAppUserInfoFn,
  readonly updateWxUserInfo?: UpdateWxUserInfoFn,
  readonly clearWxUserInfo?: ClearWxUserInfoFn,
}

export const userStore = observable({

  appUserInfo: null,
  wxUserInfo: null,

  // actions
  updateAppUserInfo: action(function(userInfo: AppUserInfo) {
    console.log(userInfo);
    // @ts-ignore
    this.appUserInfo = userInfo;
  }),

  clearAppUserInfo: action(function () {
    console.log("Clear app user info");
    // @ts-ignore
    this.appUserInfo = null;
  }),

  updateWxUserInfo: action(function (userInfo: WxUserInfo) {
    console.log(userInfo);
    // @ts-ignore
    this.wxUserInfo = userInfo;
  }),

  clearWxUserInfo: action(function () {
    console.log("Clear wx user info");
    // @ts-ignore
    this.wxUserInfo = null;
  })
})
