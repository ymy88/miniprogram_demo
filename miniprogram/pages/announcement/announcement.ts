import { fetchAnnouncements, AnnouncementItem } from "../../services/fetch-announcements";

type PageDataProps = {
  announcements: AnnouncementItem[]
}

type PageMethods = PageCustom;

Page<PageDataProps, PageMethods>({
  data: {
    announcements: []
  },

  async onLoad() {
    const resp = await fetchAnnouncements({
      count: 10,
      is_cn: true,
      query: "",
      start: 0,
      tag_id: "",
      type: "announcements"
    });

    if (resp.rows && resp.rows.length > 0) {
      this.setData({
        announcements: resp.rows
      })
    }
  }
})