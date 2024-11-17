import { Images } from "@/types/images";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FetchImagesParams {
  key: string;
  page: number;
  perPage: number;
  query?: string;
}

interface FetchImagesResponse {
  hits: Images;
  totalHits: number;
}

export const pixabayApi = createApi({
  reducerPath: "pixabayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pixabay.com/api/",
  }),
  endpoints: (builder) => ({
    fetchImages: builder.query<FetchImagesResponse, FetchImagesParams>({
      query: ({ page, perPage, query, key }) => ({
        url: "",
        params: {
          key,
          page,
          per_page: perPage,
          ...(query && { q: query }),
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs.query || "default"}`,
      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) {
          // Reset cache for a new query, just overwrite hits
          currentCache.hits = newData.hits;
        } else {
          // Append for subsequent pages
          currentCache.hits.push(...newData.hits);
        }
        currentCache.totalHits = newData.totalHits;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.query !== previousArg?.query ||
        currentArg?.page !== previousArg?.page,
    }),
  }),
});

export const { useFetchImagesQuery } = pixabayApi;
