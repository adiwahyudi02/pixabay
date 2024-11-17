import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer, {
  setBookmarks,
  addBookmark,
  removeBookmark,
  initializeBookmarks,
  saveBookmark,
  deleteBookmark,
} from "@/store/slices/bookmarks";
import { getData, storeData } from "@/utils/storage";
import Toast from "react-native-toast-message";
import { STORAGE_KEY } from "@/constants/storageKey";
import { Image, Images } from "@/types/images";
import { RootState } from "@/store";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("@/utils/storage", () => ({
  storeData: jest.fn(),
  getData: jest.fn(),
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

const bookmarks: Images = [
  {
    id: 1,
    pageURL: "http://example.com/image1",
    type: "photo",
    tags: "Nature, Landscape",
    previewURL: "http://example.com/image1.jpg",
    previewWidth: 300,
    previewHeight: 200,
    webformatURL: "http://example.com/web-format-image1.jpg",
    webformatWidth: 600,
    webformatHeight: 400,
    largeImageURL: "http://example.com/large-image1.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    imageSize: 150000,
    views: 12000,
    downloads: 5000,
    collections: 10,
    likes: 1000,
    comments: 50,
    user_id: 123,
    user: "John Doe",
    userImageURL: "http://example.com/user1.jpg",
  },
  {
    id: 2,
    pageURL: "http://example.com/image2",
    type: "photo",
    tags: "Ocean, Beach",
    previewURL: "http://example.com/image2.jpg",
    previewWidth: 300,
    previewHeight: 200,
    webformatURL: "http://example.com/web-format-image2.jpg",
    webformatWidth: 600,
    webformatHeight: 400,
    largeImageURL: "http://example.com/large-image2.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    imageSize: 160000,
    views: 15000,
    downloads: 6000,
    collections: 20,
    likes: 1200,
    comments: 60,
    user_id: 456,
    user: "Jane Doe",
    userImageURL: "http://example.com/user2.jpg",
  },
];

const image: Image = {
  id: 3,
  pageURL: "http://example.com/image3",
  type: "photo",
  tags: "Mountain, Adventure",
  previewURL: "http://example.com/image3.jpg",
  previewWidth: 350,
  previewHeight: 230,
  webformatURL: "http://example.com/web-format-image3.jpg",
  webformatWidth: 700,
  webformatHeight: 466,
  largeImageURL: "http://example.com/large-image3.jpg",
  imageWidth: 1400,
  imageHeight: 933,
  imageSize: 180000,
  views: 25000,
  downloads: 8000,
  collections: 35,
  likes: 2000,
  comments: 85,
  user_id: 789,
  user: "John Smith",
  userImageURL: "http://example.com/user3.jpg",
};

describe("bookmarks slice and async actions", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        bookmarks: bookmarksReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle setBookmarks action", () => {
    store.dispatch(setBookmarks(bookmarks));

    const state = store.getState() as RootState;
    expect(state.bookmarks.images).toEqual(bookmarks);
  });

  it("should add a bookmark if not already present", () => {
    store.dispatch(addBookmark(image));

    const state = (store.getState() as RootState).bookmarks;
    expect(state.images).toContain(image);
  });

  it("should not add a bookmark if it already exists", () => {
    store.dispatch(addBookmark(image)); // First dispatch
    store.dispatch(addBookmark(image)); // Second dispatch (duplicate)

    const state = (store.getState() as RootState).bookmarks;
    expect(state.images).toHaveLength(1); // Image should only appear once
  });

  it("should remove a bookmark", () => {
    store.dispatch(addBookmark(image)); // Add bookmark first

    store.dispatch(removeBookmark(image.id)); // Remove the bookmark

    const state = (store.getState() as RootState).bookmarks;
    expect(state.images).not.toContain(image); // Image should be removed
  });

  it("should initialize bookmarks from storage", async () => {
    // Mock getData to return stored bookmarks
    (getData as jest.Mock).mockResolvedValueOnce(image);

    await store.dispatch(initializeBookmarks() as any);

    const state = (store.getState() as RootState).bookmarks;
    expect(state.images).toEqual(image);
    expect(getData).toHaveBeenCalledWith(STORAGE_KEY.BOOKMARKS);
  });

  it("should handle saveBookmark and call storeData", async () => {
    // Mock storeData
    (storeData as jest.Mock).mockResolvedValueOnce(undefined);

    await store.dispatch(saveBookmark(image) as any);

    const state = (store.getState() as RootState).bookmarks;
    expect(state.images).toContain(image);
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEY.BOOKMARKS, state.images);
    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Bookmark Added",
      text2: "The image has been added to your bookmarks.",
    });
  });

  it("should handle deleteBookmark and call storeData", async () => {
    store.dispatch(addBookmark(image));

    // Mock storeData
    (storeData as jest.Mock).mockResolvedValueOnce(undefined);

    await store.dispatch(deleteBookmark(image.id) as any);

    const state = (store.getState() as RootState).bookmarks;
    expect(state.images).not.toContain(image);
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEY.BOOKMARKS, state.images);
    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Bookmark Removed",
      text2: "The image has been removed from your bookmarks.",
    });
  });

  it("should handle error in initializeBookmarks", async () => {
    (getData as jest.Mock).mockRejectedValueOnce(new Error("Failed to load"));

    await store.dispatch(initializeBookmarks() as any);

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Error",
      text2: "Failed to load bookmarks.",
    });
  });

  it("should handle error in saveBookmark", async () => {
    // Mock failure for storeData
    (storeData as jest.Mock).mockRejectedValueOnce(new Error("Failed to save"));

    await store.dispatch(saveBookmark(image) as any);

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Error",
      text2: "Failed to save bookmark.",
    });
  });

  it("should handle error in deleteBookmark", async () => {
    store.dispatch(addBookmark(image));

    // Mock failure for storeData
    (storeData as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to remove")
    );

    await store.dispatch(deleteBookmark(image.id) as any);

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Error",
      text2: "Failed to remove bookmark.",
    });
  });
});
