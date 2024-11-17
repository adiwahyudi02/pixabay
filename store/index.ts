import { pixabayApi } from "@/store/api/images";
import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from "./slices/bookmarks";
import authReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    [pixabayApi.reducerPath]: pixabayApi.reducer,
    auth: authReducer,
    bookmarks: bookmarksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pixabayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
