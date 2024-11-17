import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  setAuthentication,
  logout,
  authenticateUser,
  checkAuthentication,
} from "@/store/slices/auth";
import { getData, storeData, removeData } from "@/utils/storage";
import { STORAGE_KEY } from "@/constants/storageKey";
import { RootState } from "@/store";

jest.mock("@/utils/storage", () => ({
  storeData: jest.fn(),
  getData: jest.fn(),
  removeData: jest.fn(),
}));

global.fetch = jest.fn();

const mockKey = "mock_pixabay_key";

describe("auth slice and async actions", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle setAuthentication action", () => {
    store.dispatch(setAuthentication({ isAuthenticated: true, key: mockKey }));

    const state = store.getState() as RootState;
    expect(state.auth.isAuthenticated).toBe(true);
    expect(state.auth.pixabayKey).toBe(mockKey);
  });

  it("should handle logout action", () => {
    store.dispatch(setAuthentication({ isAuthenticated: true, key: mockKey }));

    store.dispatch(logout());

    const state = store.getState() as RootState;
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.pixabayKey).toBe("");
    expect(removeData).toHaveBeenCalledWith(STORAGE_KEY.PIXABAY_KEY);
  });

  it("should authenticate user and store key", async () => {
    const mockResponse = { key: mockKey };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await store.dispatch(authenticateUser("username", "password") as any);

    const state = store.getState() as RootState;
    expect(state.auth.isAuthenticated).toBe(true);
    expect(state.auth.pixabayKey).toBe(mockKey);
    expect(storeData).toHaveBeenCalledWith(STORAGE_KEY.PIXABAY_KEY, mockKey);
  });

  it("should handle failed authentication", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    await expect(
      store.dispatch(authenticateUser("username", "password") as any)
    ).rejects.toThrow("Invalid credentials");

    const state = store.getState() as RootState;
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.pixabayKey).toBe("");
  });

  it("should handle checkAuthentication and set key if exists", async () => {
    (getData as jest.Mock).mockResolvedValueOnce(mockKey);

    await store.dispatch(checkAuthentication() as any);

    const state = store.getState() as RootState;
    expect(state.auth.isAuthenticated).toBe(true);
    expect(state.auth.pixabayKey).toBe(mockKey);
    expect(getData).toHaveBeenCalledWith(STORAGE_KEY.PIXABAY_KEY);
  });

  it("should handle checkAuthentication when no key is found", async () => {
    (getData as jest.Mock).mockResolvedValueOnce(null);

    await store.dispatch(checkAuthentication() as any);

    const state = store.getState() as RootState;
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.pixabayKey).toBe("");
  });

  it("should handle errors in authenticateUser", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(
      store.dispatch(authenticateUser("username", "password") as any)
    ).rejects.toThrow("Network error");

    const state = store.getState() as RootState;
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.pixabayKey).toBe("");
  });

  it("should handle errors in checkAuthentication", async () => {
    (getData as jest.Mock).mockRejectedValueOnce(new Error("Storage error"));

    await expect(store.dispatch(checkAuthentication() as any)).rejects.toThrow(
      "Storage error"
    );
  });
});
