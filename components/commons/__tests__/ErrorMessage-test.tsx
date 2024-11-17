import React from "react";
import { render } from "@testing-library/react-native";
import { ErrorMessage } from "../ErrorMessage";

describe("ErrorMessage Component", () => {
  it("renders the error message when error prop is passed", () => {
    const errorMessage = "This is an error!";
    const { getByText } = render(<ErrorMessage error={errorMessage} />);

    // Check if the error message is rendered
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it("does not render when error prop is not passed", () => {
    const { queryByText } = render(<ErrorMessage />);

    // Ensure no error message is rendered when error is undefined or null
    expect(queryByText("This is an error!")).toBeNull();
  });
});
