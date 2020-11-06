import { userStore, UserStoreData, UserStoreActions } from "../../stores/userstore";
// @ts-ignore
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'

// Have to use "require" here
const computedBehavior = require("miniprogram-computed");

type PageDataProps = UserStoreData & {
  wxAuthChecked: boolean;
}
type PageMethods = PageCustom & UserStoreActions;

Page<PageDataProps, PageMethods>({
  behaviors: [storeBindingsBehavior, computedBehavior],

  data: {
    wxAuthChecked: false,

    // 这个值虽然来自userStore，但仍然必须定义一个空的值在这里，这样才能让computed里的方法监听到它的变化
    appUserInfo: null,
    wxUserInfo: null,
  },

  storeBindings: {
    store: userStore,
    fields: ["appUserInfo", "wxUserInfo"],
    actions: ["clearAppUserInfo", "updateWxUserInfo", "clearWxUserInfo"]
  },

  computed: {
    appUserInfoItems(data: PageDataProps) {
      if (!data.appUserInfo || !data.appUserInfo.wishpostId) {
        return []
      }

      return [
        { key: "用户名", value: data.appUserInfo.username },
        { key: "Email", value: data.appUserInfo.email},
        { key: "电话号码", value: data.appUserInfo.phoneNumber},
        { key: "WishPost ID", value: data.appUserInfo.wishpostId},
        { key: "Merchant ID", value: data.appUserInfo.merchantId}
      ]
    }
  },

  onLoad() {
    wx.nextTick(async () => {
      if (!this.data.appUserInfo || !this.data.appUserInfo.wishpostId) {
        this.setData({
          wxAuthChecked: true
        })
        return;
      }

      wx.login({
        success: (e) => {
          console.log(e);
          this.checkAuthAndGetWxUserInfo();
        }
      })
    })
  },

  async checkAuthAndGetWxUserInfo() {
    const res = await wx.getSetting()
    if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      wx.getUserInfo({
        withCredentials: true,
        success: (res) => {
          console.log(res);
          if (this.updateWxUserInfo) {
            this.updateWxUserInfo(res.userInfo);
          }
        },
        complete: () => {
          wx.nextTick(() => {
            this.setData({
              wxAuthChecked: true
            })
          })
        }
      });
    } else {
      this.setData({
        wxAuthChecked: true
      })
    }
  },

  handleGetWxUserInfo(e: WechatMiniprogram.CustomEvent<WechatMiniprogram.GetUserInfoSuccessCallbackResult>) {
    console.log(e);
    if (this.updateWxUserInfo) {
      this.updateWxUserInfo(e.detail.userInfo);
    }
  },

  handleLogout() {
    wx.removeStorageSync("userToken");
    if (this.clearAppUserInfo) {
      this.clearAppUserInfo();
    }
    if (this.clearWxUserInfo) {
      this.clearWxUserInfo();
    }
  }
})