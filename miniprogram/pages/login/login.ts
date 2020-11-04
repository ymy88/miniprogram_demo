import { userStore, UserStoreActions, UserStoreData } from "../../stores/userstore";
// @ts-ignore
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { loginWithUsername } from "../../services/login-with-username";

// Have to use "require" here
const computedBehavior = require("miniprogram-computed");

type LoginDataProps = UserStoreData & {
  username: string,
  password: string,
  rules: any
}

type LoginOtherProps = PageCustom & UserStoreActions;

Page<LoginDataProps, LoginOtherProps>({
  behaviors: [storeBindingsBehavior, computedBehavior],
  data: {
    username: "",
    password: "",

    rules: [
      {
        name: "username",
        rules: {required: true, message: "用户名是必选项"},
      }, 
      {
        name: "password",
        rules: {required: true, message: "密码是必选项"},
      }, 
    ],
  },

  storeBindings: {
    store: userStore,
    fields: ["appUserInfo"],
    actions: ["updateAppUserInfo"]
  },

  computed: {
    formData(data: LoginDataProps) {
      return {
        username: data.username,
        password: data.password
      }
    }
  },

  handleInvalidInput(errors: any) {
    const firstError = Object.keys(errors)
    if (firstError.length) {
      this.setData({
        error: errors[firstError[0]].message
      })
    }
  },

  async login() {
    const resp = await loginWithUsername({
      username: this.data.username,
      password: this.data.password
    })

    const { code, errorMessage, userInfo, userToken } = resp;
    if (code != 0) {
      wx.showToast({
        title: errorMessage || "登录失败",
        icon: "none",
        duration: 3000
      })
      return;
    }

    if (this.updateAppUserInfo) {
      this.updateAppUserInfo(userInfo);
    }
    wx.setStorageSync("userToken", userToken);

    wx.navigateBack();
  },

  onSubmit() {
    this.selectComponent('#form').validate(async (valid: boolean, errors: any) => {
      console.log('valid', valid, errors)
      if (!valid) {
        this.handleInvalidInput(errors);
      } else {
        await this.login();
      }
    });
  },

  // 双向绑定会报错，需要加个空函数来规避
  doNothing() {}
})