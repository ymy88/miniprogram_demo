import { apiPost } from "../utils/api";

interface FetchAnnouncementsReq {
  count: number,
  is_cn: boolean,
  query: string,
  start: number,
  tag_id: string,
  type: "announcements"
}

export interface AnnouncementItem {
  id: string,
  publish_time: string,
  text: string,
  title: string
}

interface FetchAnnouncementsResp extends APIRespDataBase {
  feed_ended: boolean,
  next_offset: number,
  number_results: number,
  rows: AnnouncementItem[]
}

export const fetchAnnouncements = async (req: FetchAnnouncementsReq) => {
  const resp = await apiPost<FetchAnnouncementsReq, FetchAnnouncementsResp>("/fetch-announcements", req);
  const { data } = resp;
  return data;
}