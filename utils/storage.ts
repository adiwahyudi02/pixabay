import AsyncStorage from "@react-native-async-storage/async-storage";

export const PREFIX = "@pixabay_";

// Helper to construct full key with prefix
const getKey = (key: string) => `${PREFIX}${key}`;

export const storeData = async <T>(key: string, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(getKey(key), JSON.stringify(value));
  } catch (error) {
    throw error;
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(getKey(key));
    return value ? JSON.parse(value) : null;
  } catch (error) {
    throw error;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(getKey(key));
  } catch (error) {
    throw error;
  }
};
