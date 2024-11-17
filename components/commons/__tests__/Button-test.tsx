import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../Button";

describe("Button Component", () => {
  // Test rendering with the correct text for the button
  it("renders the correct text", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    const buttonText = getByText("Click Me");
    expect(buttonText).toBeTruthy();
  });

  // Test button loading state
  it("renders a loading indicator when isLoading is true", () => {
    const { getByTestId } = render(<Button isLoading={true}>Click Me</Button>);
    const loadingIndicator = getByTestId("loading-indicator");
    expect(loadingIndicator).toBeTruthy();
  });

  // Test that children are rendered when not loading
  it("renders children when isLoading is false", () => {
    const { getByText } = render(<Button isLoading={false}>Click Me</Button>);
    const buttonText = getByText("Click Me");
    expect(buttonText).toBeTruthy();
  });

  // Test if the button is disabled when loading
  it("disables the button when isLoading is true", () => {
    const { getByTestId } = render(
      <Button testID="button" isLoading={true}>
        Click Me
      </Button>
    );
    const button = getByTestId("button");
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  // Test that the onPress callback is called when the button is pressed
  it("calls onPress when clicked", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button testID="button" onPress={mockOnPress}>
        Click Me
      </Button>
    );
    const button = getByTestId("button");
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  // Test the button behavior when it's loading (ensures onPress is not called)
  it("does not call onPress when loading", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button testID="button" onPress={mockOnPress} isLoading={true}>
        Click Me
      </Button>
    );
    const button = getByTestId("button");
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
