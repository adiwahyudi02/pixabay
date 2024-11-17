import { getData, removeData, storeData } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { STORAGE_KEY } from "@/constants/storageKey";
import { Platform } from "react-native";

const initialState = {
  isAuthenticated: false,
  pixabayKey: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.pixabayKey = action.payload.key;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.pixabayKey = "";
      removeData(STORAGE_KEY.PIXABAY_KEY);
    },
  },
});

export const { setAuthentication, logout } = authSlice.actions;

// Note: If you want to run this app on Expo Go using your phone,
// make sure to replace 'localhost' with your computer's IP address
// that is accessible from your phone. Both devices must be on the same network.
const baseUrl =
  Platform.OS === "android"
    ? "http://10.0.2.2:4000/api"
    : "http://localhost:4000/api";

export const authenticateUser =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If successful, store the key and update state
        await storeData(STORAGE_KEY.PIXABAY_KEY, data.key);
        dispatch(setAuthentication({ isAuthenticated: true, key: data.key }));
      } else {
        throw new Error(data.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      throw new Error(error.message || "An unknown error occurred");
    }
  };

export const checkAuthentication = () => async (dispatch: AppDispatch) => {
  const key = await getData(STORAGE_KEY.PIXABAY_KEY);
  if (key) {
    dispatch(setAuthentication({ isAuthenticated: true, key }));
  }
};

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectPixabayKey = (state: RootState) => state.auth.pixabayKey;

export default authSlice.reducer;
