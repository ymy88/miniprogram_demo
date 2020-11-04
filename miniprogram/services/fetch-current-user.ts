import { apiGet } from "../utils/api";

interface FetchCurrentUserReq { }
interface FetchCurrentUserResp extends APIRespDataBase {
  userInfo: AppUserInfo
}

export const fetchCurrentUser = async () => {
  const resp = await apiGet<FetchCurrentUserReq, FetchCurrentUserResp>("/current-user", {});
  const { data } = resp;
  return data;
}