
import { baseApi } from "../../redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentPosts: builder.query({
      query: (type) => `/dashboard?type=${type}`,
      provideTags: ["RecentPosts"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetRecentPostsQuery } = userApi;
