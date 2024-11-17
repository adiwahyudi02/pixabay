import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { getData, storeData } from "@/utils/storage";
import Toast from "react-native-toast-message";
import { Image, Images } from "@/types/images";
import { STORAGE_KEY } from "@/constants/storageKey";

interface BookmarksState {
  images: Images;
}

const initialState: BookmarksState = {
  images: [],
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmarks: (state, action: PayloadAction<Images>) => {
      state.images = action.payload;
    },
    addBookmark: (state, action: PayloadAction<Image>) => {
      const isAlreadyBookmarked = state.images.some(
        (image) => image.id === action.payload.id
      );
      if (!isAlreadyBookmarked) {
        state.images.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.images = state.images.filter(
        (image) => image.id !== action.payload
      );
    },
  },
});

export const { setBookmarks, addBookmark, removeBookmark } =
  bookmarksSlice.actions;
export default bookmarksSlice.reducer;

// Async actions for persistent storage
export const initializeBookmarks = () => async (dispatch: AppDispatch) => {
  try {
    const storedBookmarks = await getData<Images>(STORAGE_KEY.BOOKMARKS);
    if (storedBookmarks) {
      dispatch(setBookmarks(storedBookmarks));
    }
  } catch {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Failed to load bookmarks.",
    });
  }
};

export const saveBookmark =
  (image: Image) =>
  async (
    dispatch: AppDispatch,
    getState: () => { bookmarks: BookmarksState }
  ) => {
    try {
      dispatch(addBookmark(image));
      const { bookmarks } = getState();
      await storeData(STORAGE_KEY.BOOKMARKS, bookmarks.images);
      Toast.show({
        type: "success",
        text1: "Bookmark Added",
        text2: "The image has been added to your bookmarks.",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save bookmark.",
      });
    }
  };

export const deleteBookmark =
  (id: number) =>
  async (
    dispatch: AppDispatch,
    getState: () => { bookmarks: BookmarksState }
  ) => {
    try {
      dispatch(removeBookmark(id));
      const { bookmarks } = getState();
      await storeData(STORAGE_KEY.BOOKMARKS, bookmarks.images);
      Toast.show({
        type: "success",
        text1: "Bookmark Removed",
        text2: "The image has been removed from your bookmarks.",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to remove bookmark.",
      });
    }
  };
