import { apiPost } from "../utils/api";

export interface TrackingPair {
  trackingNumber: string,
  currentLocation: string
}

interface FetchTrackingInfoReq {
  trackingNumbers: string[]
}

interface FetchTrackingInfoResp extends APIRespDataBase {
  trackingInfo: TrackingPair[] | null
}

export const fetchTrackingInfo = async (req: FetchTrackingInfoReq) => {
  const resp = await apiPost<FetchTrackingInfoReq, FetchTrackingInfoResp>("/tracking-info", req);
  const { data } = resp;
  return data;
}