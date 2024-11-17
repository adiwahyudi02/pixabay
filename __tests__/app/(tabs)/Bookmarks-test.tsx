import { render, fireEvent } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookmark, initializeBookmarks } from "@/store/slices/bookmarks";
import Bookmarks from "@/app/(tabs)/bookmarks";
import { Images } from "@/types/images";

// Mocking necessary modules
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("@/store/slices/bookmarks", () => ({
  saveBookmark: jest.fn(),
  deleteBookmark: jest.fn(),
  initializeBookmarks: jest.fn(),
}));

describe("Bookmarks Page", () => {
  let dispatchMock: jest.Mock;
  const mockBookmarks: Images = [
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
    (useSelector as unknown as jest.Mock).mockReturnValue(mockBookmarks); // Mocking the state to return bookmarks
    jest.clearAllMocks();
  });

  it("renders the bookmarks page with bookmarks", async () => {
    const { getByTestId } = render(<Bookmarks />);

    // Check that ImageList is rendered and has bookmarks
    expect(getByTestId("image-list")).toBeTruthy();

    // Check that each bookmark is displayed with correct data
    mockBookmarks.forEach((bookmark) => {
      expect(getByTestId(`image-card-${bookmark.id}`)).toBeTruthy();
    });
  });

  it("toggles bookmark status when clicking the bookmark button", async () => {
    const { getByTestId } = render(<Bookmarks />);

    // Simulate clicking the bookmark button for the first image
    const bookmarkButton = getByTestId("bookmark-button-1");
    fireEvent.press(bookmarkButton);

    // Ensure deleteBookmark is called (i.e., image is removed from the bookmark list)
    expect(deleteBookmark).toHaveBeenCalledWith(1);
  });

  it("displays empty message when no bookmarked images are available", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]); // Mocking empty bookmarks

    const { getByText } = render(<Bookmarks />);

    // Check if the empty state message is rendered
    expect(getByText("There is no Image.")).toBeTruthy();
  });

  it("initializes bookmarks when the page loads", async () => {
    render(<Bookmarks />);

    // Ensure the initializeBookmarks action is called when the page loads
    expect(initializeBookmarks).toHaveBeenCalled();
  });
});
