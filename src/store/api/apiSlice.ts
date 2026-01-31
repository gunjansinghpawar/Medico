import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBlog, INews, ApiResponse } from '../../types';

interface BlogListResponse {
  blogs: IBlog[];
  total: number;
  page: number;
  limit: number;
}

interface NewsListResponse {
  news: INews[]; // Assuming service follows similar pattern with 'news' key
  total: number;
  page: number;
  limit: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api', prepareHeaders: (headers) => headers }),
  tagTypes: ['Blog', 'News'],
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/blogs?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<BlogListResponse>) => response.data,
      providesTags: ['Blog'],
    }),
    getBlogById: builder.query<IBlog, string>({
      query: (id) => `/blogs/${id}`,
      transformResponse: (response: ApiResponse<IBlog>) => response.data,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    getNews: builder.query<NewsListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/news?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<NewsListResponse>) => response.data,
      providesTags: ['News'],
    }),
    getNewsById: builder.query<INews, string>({
      query: (id) => `/news/${id}`,
      transformResponse: (response: ApiResponse<INews>) => response.data,
      providesTags: (result, error, id) => [{ type: 'News', id }],
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogByIdQuery, useGetNewsQuery, useGetNewsByIdQuery } = apiSlice;
