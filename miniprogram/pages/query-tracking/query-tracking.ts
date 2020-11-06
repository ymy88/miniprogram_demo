import { userStore, UserStoreData, UserStoreActions } from "../../stores/userstore";
import { fetchTrackingInfo, TrackingPair } from "../../services/fetch-tracking-info";

// @ts-ignore
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'

// Have to use "require" here
const computedBehavior = require("miniprogram-computed");

type PageDataProps = UserStoreData & {
  rawTrackingNumbers: string;
  trackingInfo: TrackingPair[] | null;

  // computed
  trackingNumbers?: string[];
};

type PageMethodProps = UserStoreActions & PageCustom;

Page<PageDataProps, PageMethodProps>({
  behaviors: [storeBindingsBehavior, computedBehavior],

  data: {
    rawTrackingNumbers: "",
    trackingInfo: null
  },

  storeBindings: {
    store: userStore,
    fields: ["appUserInfo"],
    actions: ["updateAppUserInfo"]
  },

  computed: {
    trackingNumbers(data: PageDataProps) {
      const raw = data.rawTrackingNumbers;
      if (raw && raw.length > 0) {
        return raw.split("\n").map((item) => item.trim())
      }
      return null;
    }
  },

  async handleSubmit() {
    if (!this.data.trackingNumbers || this.data.trackingNumbers.length == 0) {
      wx.showToast({
        title: "未填物流单号",
        icon: "none",
        duration: 3000
      })
      return;
    }

    const data = await fetchTrackingInfo({
      trackingNumbers: this.data.trackingNumbers
    })

    if (data.code != 0) {
      wx.showToast({
        title: data.errorMessage || "请稍后再试",
        icon: "none",
        duration: 3000
      })
      return
    }

    const trackingInfo = data.trackingInfo;
    this.setData({
      trackingInfo: trackingInfo
    })
  },

  clearInput() {
    this.setData({
      rawTrackingNumbers: ""
    })
  },

  async handleScan() {
    try {
      const res = await wx.chooseImage({ count: 1 })
      console.log(res.errMsg);
      if (res.tempFilePaths.length > 0) {
        this.setData({
          imagePath: res.tempFilePaths[0]
        })
      }
    } catch (e) {
      console.log(e);
    }
  },

  // 双向绑定会报错，需要加个空函数来规避
  doNothing() {}
})
