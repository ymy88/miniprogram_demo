import { userStore, UserStoreData, UserStoreActions } from "../../stores/userstore";
// @ts-ignore
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'

// Have to use "require" here
const computedBehavior = require("miniprogram-computed");

type PageDataProps = UserStoreData;
type PageMethods = PageCustom & UserStoreActions;

Page<PageDataProps, PageMethods>({
  behaviors: [storeBindingsBehavior, computedBehavior],

  data: {
    // 这个值虽然来自userStore，但仍然必须定义一个空的值在这里，这样才能让computed里的方法监听到它的变化
    appUserInfo: {}
  },

  storeBindings: {
    store: userStore,
    fields: ["appUserInfo"],
    actions: ["clearAppUserInfo"]
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

  logout() {
    wx.removeStorageSync("userToken");
    if (this.clearAppUserInfo) {
      this.clearAppUserInfo()
    }
  }
})