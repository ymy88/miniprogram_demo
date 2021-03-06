// index.ts
import { userStore, UserStoreData, UserStoreActions } from "../../stores/userstore";
import { fetchCurrentUser } from "../../services/fetch-current-user";

// @ts-ignore
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'

type PageDataProps = UserStoreData;
type PageMethodProps = UserStoreActions & PageCustom;

Page<PageDataProps, PageMethodProps>({
  behaviors: [storeBindingsBehavior],

  data: {
  },

  storeBindings: {
    store: userStore,
    fields: ["appUserInfo"],
    actions: ["updateAppUserInfo"]
  },

  onLoad() {
    // store binding 不是立即生效的
    // 调用wx.nextTick()函数将依赖bingding的逻辑放到下一个事件周期
    wx.nextTick(async () => {
      const fetchRes = await fetchCurrentUser();
      const { userInfo } = fetchRes;
      if (this.updateAppUserInfo) {
        this.updateAppUserInfo(userInfo);
      }
    })
  },
})
