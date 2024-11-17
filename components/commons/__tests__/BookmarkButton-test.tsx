import { render, fireEvent } from "@testing-library/react-native";
import { BookmarkButton } from "../BookmarkButton";

describe("BookmarkButton Component", () => {
  it("renders correctly when not active", () => {
    const { getByTestId } = render(<BookmarkButton onPress={() => {}} />);
    const button = getByTestId("bookmark-button");
    const icon = getByTestId("bookmark-icon");

    // Check if the button is rendered
    expect(button).toBeTruthy();
    // Check if the icon is rendered with the inactive state
    expect(icon.children[0].props.name).toBe("favorite-border");
  });

  it("renders correctly when active", () => {
    const { getByTestId } = render(
      <BookmarkButton isActive onPress={() => {}} />
    );
    const icon = getByTestId("bookmark-icon");

    // Check if the icon is rendered with the active state
    expect(icon.children[0].props.name).toBe("favorite");
  });

  it("calls onPress when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<BookmarkButton onPress={onPressMock} />);

    const button = getByTestId("bookmark-button");
    fireEvent.press(button); // Simulate pressing the button

    // Check if onPress was called
    expect(onPressMock).toHaveBeenCalled();
  });
});
