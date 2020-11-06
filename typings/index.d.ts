type ComponentData = WechatMiniprogram.Component.DataOption;
type ComponentProperty = WechatMiniprogram.Component.PropertyOption;
type ComponentMethod = WechatMiniprogram.Component.MethodOption;
type PageData = WechatMiniprogram.Page.DataOption;
type PageCustom = WechatMiniprogram.Page.CustomOption;
type WxUserInfo = WechatMiniprogram.UserInfo;

type APIReqBase = Record<string, any> | {}

interface APIRespDataBase {
  readonly code: number,
  readonly errorMessage?: string
}


interface APIResp<T extends APIRespDataBase> {
  readonly statusCode: number,
  readonly errMsg?: string,
  readonly data: T
}

interface AppUserInfo {
  readonly username?: string,
  readonly email?: string,
  readonly phoneNumber?: string,
  readonly wishpostId?: string,
  readonly merchantId?: string
}

// IAction copied from miniprogram/node_modules/mobx-miniprogram/lib/core/action.d.ts
interface IAction {
  isMobxAction: boolean;
}

interface GlobalData {
}

interface IAppOption extends Record<string, any> {
  globalData: GlobalData,
}