import { render, fireEvent } from "@testing-library/react-native";
import { ImageList } from "../ImageList";
import { Images } from "@/types/images";

const mockData: Images = [
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

const mockIsBookmarked = jest.fn((id) => false);
const mockToggleBookmark = jest.fn();

describe("ImageList", () => {
  it("should render loading indicator when isLoading is true", () => {
    const { getByTestId } = render(
      <ImageList
        data={[]}
        isLoading={true}
        isBookmarked={mockIsBookmarked}
        toogleBookmark={mockToggleBookmark}
      />
    );

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("should render empty state when there is no data and isLoading is false", () => {
    const { getByTestId, getByText } = render(
      <ImageList
        data={[]}
        isLoading={false}
        isBookmarked={mockIsBookmarked}
        toogleBookmark={mockToggleBookmark}
      />
    );

    expect(getByTestId("image-list")).toBeTruthy();
    expect(getByText("There is no Image.")).toBeTruthy();
  });

  it("should render images when data is available", () => {
    const { getByTestId, getByText } = render(
      <ImageList
        data={mockData}
        isLoading={false}
        isBookmarked={mockIsBookmarked}
        toogleBookmark={mockToggleBookmark}
      />
    );

    // Check if image items are rendered
    expect(getByTestId("image-list")).toBeTruthy();
    expect(getByText("Nature, Landscape")).toBeTruthy();
    expect(getByText("Ocean, Beach")).toBeTruthy();
  });

  it("should call toggleBookmark when bookmark button is pressed", () => {
    const { getByTestId } = render(
      <ImageList
        data={mockData}
        isLoading={false}
        isBookmarked={mockIsBookmarked}
        toogleBookmark={mockToggleBookmark}
      />
    );

    // Find the first ImageCard and simulate bookmark button press
    const bookmarkButton = getByTestId("bookmark-button-1");
    fireEvent.press(bookmarkButton);

    // Check if the toggleBookmark was called with the correct image data
    expect(mockToggleBookmark).toHaveBeenCalledWith(mockData[0]);
  });

  it("should call fetchNextPage when reaching the end of the list", async () => {
    const mockFetchNextPage = jest.fn();

    const { getByTestId } = render(
      <ImageList
        data={mockData}
        isLoading={false}
        fetchNextPage={mockFetchNextPage}
        isBookmarked={mockIsBookmarked}
        toogleBookmark={mockToggleBookmark}
      />
    );

    // Simulate reaching the end of the list
    fireEvent(getByTestId("image-list"), "endReached");

    // Verify that fetchNextPage was called
    expect(mockFetchNextPage).toHaveBeenCalled();
  });
});
