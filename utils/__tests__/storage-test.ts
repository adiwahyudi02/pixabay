import { storeData, getData, removeData, PREFIX } from "@/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("Storage Utilities", () => {
  const key = "testKey";
  const value = { test: "data" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("stores data successfully", async () => {
    await storeData(key, value);

    // Verify that AsyncStorage.setItem was called with the correct arguments
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      `${PREFIX}${key}`,
      JSON.stringify(value)
    );
  });

  it("retrieves data successfully", async () => {
    // Mock the return value of AsyncStorage.getItem
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(value)
    );

    const result = await getData(key);

    expect(result).toEqual(value); // Verify that the retrieved value matches the original
  });

  it("returns null when no data is found", async () => {
    // Mock the return value of AsyncStorage.getItem to return null
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const result = await getData(key);

    expect(result).toBeNull(); // Verify that the result is null
  });

  it("removes data successfully", async () => {
    await removeData(key);

    // Verify that AsyncStorage.removeItem was called with the correct key
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(`${PREFIX}${key}`);
  });
});
