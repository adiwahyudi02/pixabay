import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { InputBox } from "../InputBox";
import { theme } from "@/constants/theme";

describe("InputBox Component", () => {
  it("renders correctly with label", () => {
    const { getByText } = render(<InputBox label="Username" />);

    // Check if the label text is rendered
    expect(getByText("Username")).toBeTruthy();
  });

  it("does not render the label if not passed", () => {
    const { queryByText } = render(<InputBox />);

    // Ensure no label is rendered when label is not passed
    expect(queryByText("Username")).toBeNull();
  });

  it("displays error message when error prop is passed", () => {
    const errorMessage = "This field is required";
    const { getByText } = render(<InputBox error={errorMessage} />);

    // Check if the error message is rendered
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it("applies error styles when error prop is passed", () => {
    const errorMessage = "This field is required";
    const { getByTestId } = render(<InputBox error={errorMessage} />);

    // Check if the input has the error border color style applied
    const input = getByTestId("input-box");
    const inputStyle = input.props.style;

    // The error border color should be applied when error is present
    expect(inputStyle).toEqual(
      expect.arrayContaining([{ borderColor: theme.colors.danger }])
    );
  });

  it("applies correct styles when no error prop is passed", () => {
    const { getByTestId } = render(<InputBox />);

    const input = getByTestId("input-box");
    const inputStyle = input.props.style;

    // Check the input style does not contain error styles
    expect(inputStyle).not.toEqual(
      expect.arrayContaining([{ borderColor: theme.colors.danger }])
    );
  });

  it("sets secureTextEntry to true when isPassword is true", () => {
    const { getByTestId } = render(<InputBox isPassword={true} />);

    // Check if secureTextEntry is set to true
    const input = getByTestId("input-box");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("handles text input change correctly", () => {
    const mockOnChange = jest.fn(); // Create a mock function for onChangeText
    const { getByTestId } = render(<InputBox onChangeText={mockOnChange} />);

    const input = getByTestId("input-box");

    // Simulate typing text into the input field
    fireEvent.changeText(input, "Hello World");

    // Check if the mock function was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith("Hello World");
  });

  it("passes value prop correctly to the input", () => {
    const value = "Hello World";
    const { getByTestId } = render(<InputBox value={value} />);

    const input = getByTestId("input-box");

    // Check if the TextInput has the correct value passed as prop
    expect(input.props.value).toBe(value);
  });
});
