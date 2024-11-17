import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookmark } from "@/store/slices/bookmarks";
import { useFetchImagesQuery } from "@/store/api/images";
import Pixabay from "@/app/(tabs)";
import { Images } from "@/types/images";

// Mocking necessary modules
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("@/store/api/images", () => ({
  useFetchImagesQuery: jest.fn(),
}));

jest.mock("@/store/slices/bookmarks", () => ({
  saveBookmark: jest.fn(),
  deleteBookmark: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("Pixabay Page", () => {
  let dispatchMock: jest.Mock;
  const mockImages: Images = [
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

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as unknown as jest.Mock).mockReturnValue(mockImages); // Mocking the state to return images
    (useFetchImagesQuery as jest.Mock).mockReturnValue({
      data: { hits: mockImages },
      isLoading: false,
      isFetching: false,
    });
    jest.clearAllMocks();
  });

  it("renders the Pixabay page with search input", async () => {
    const { getByTestId } = render(<Pixabay />);

    // Check that the SearchInput is rendered
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("debounces the search input and triggers the onChange callback", async () => {
    const { getByTestId } = render(<Pixabay />);

    const searchInput = getByTestId("search-input");

    // Simulate typing in the search input
    fireEvent.changeText(searchInput, "nature");

    // Wait for the debounce period (700ms)
    await waitFor(
      () =>
        expect(useFetchImagesQuery).toHaveBeenCalledWith(
          expect.objectContaining({
            query: "nature",
          })
        ),
      { timeout: 1000 }
    );

    // Simulate typing a new query
    fireEvent.changeText(searchInput, "mountain");

    await waitFor(
      () =>
        expect(useFetchImagesQuery).toHaveBeenCalledWith(
          expect.objectContaining({
            query: "mountain",
          })
        ),
      { timeout: 1000 }
    );
  });

  it("resets the search input when the reset button is clicked", async () => {
    const { getByTestId } = render(<Pixabay />);

    const searchInput = getByTestId("search-input");

    // Simulate typing in the search input
    fireEvent.changeText(searchInput, "nature");

    // Simulate clicking the reset button
    const resetButton = getByTestId("reset-button");
    fireEvent.press(resetButton);

    // Check if the search input is reset
    expect(searchInput.props.value).toBe("");
  });

  it("toggles bookmark status when clicking the bookmark button", async () => {
    const { getByTestId } = render(<Pixabay />);

    // Simulate clicking the bookmark button for the first image
    const bookmarkButton = getByTestId("bookmark-button-1");

    // Simulate clicking the bookmark button again to add the image back
    fireEvent.press(bookmarkButton);

    // Wait for the state change or action to be invoked
    await waitFor(() => {
      // Ensure deleteBookmark is called (i.e., image is removed from the bookmark list)
      expect(deleteBookmark).toHaveBeenCalledWith(1);
    });
  });
});
