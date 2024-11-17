import { render, fireEvent } from "@testing-library/react-native";
import { ImageCard } from "../ImageCard";

describe("ImageCard Component", () => {
  const mockToggleBookmark = jest.fn();

  it("should render correctly with provided props", () => {
    const { getByTestId, getByText } = render(
      <ImageCard
        previewURL="http://example.com/preview.jpg"
        tags="Nature"
        user="John Doe"
        userImageURL="http://example.com/user.jpg"
        isBookmarked={false}
        toggleBookmark={mockToggleBookmark}
      />
    );

    // Check if all elements are rendered
    expect(getByTestId("image-card")).toBeTruthy();
    expect(getByTestId("preview-image")).toBeTruthy();
    expect(getByText("Nature")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByTestId("user-image")).toBeTruthy();
    expect(getByTestId("bookmark-button")).toBeTruthy();
  });

  it("should toggle bookmark on button press", () => {
    const { getByTestId } = render(
      <ImageCard
        previewURL="http://example.com/preview.jpg"
        tags="Nature"
        user="John Doe"
        userImageURL="http://example.com/user.jpg"
        isBookmarked={false}
        toggleBookmark={mockToggleBookmark}
      />
    );

    // Simulate button press
    fireEvent.press(getByTestId("bookmark-button"));

    // Check if toggleBookmark was called
    expect(mockToggleBookmark).toHaveBeenCalled();
  });
});
