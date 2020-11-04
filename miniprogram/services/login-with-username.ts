import { apiPost } from "../utils/api";

interface LoginWithUsernameReq {
  username: string,
  password: string
}

interface LoginWithUsernameResp extends APIRespDataBase {
  userToken: string,
  userInfo: AppUserInfo
}

export const loginWithUsername = async (params: LoginWithUsernameReq) => {
  const resp = await apiPost<LoginWithUsernameReq, LoginWithUsernameResp>("/login-with-username", params)
  const { data } = resp;
  return data;
}