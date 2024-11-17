import React from "react";
import { render } from "@testing-library/react-native";
import { theme } from "@/constants/theme";
import { Label } from "../Label";

describe("Label Component", () => {
  it("renders label correctly", () => {
    const { getByText } = render(<Label label="Test Label" />);
    expect(getByText("Test Label")).toBeTruthy();
  });

  it("renders with error style when isError is true", () => {
    const { getByText } = render(<Label label="Test Label" isError />);
    const label = getByText("Test Label");

    const flattenedStyles = label.props.style.flat();

    // Check if the error color is applied by inspecting the style array
    const isErrorStyleApplied = flattenedStyles.some(
      (style: any) => style.color === theme.colors.danger
    );

    expect(isErrorStyleApplied).toBe(true);
  });

  it("renders with required asterisk when isRequired is true", () => {
    const { getByText } = render(<Label label="Test Label" isRequired />);
    const asterisk = getByText(" *");

    // Check if the asterisk is rendered
    expect(asterisk).toBeTruthy();
    // Check if asterisk has the correct style
    expect(asterisk.props.style).toContainEqual({ color: theme.colors.danger });
  });

  it("does not render asterisk when isRequired is false", () => {
    const { queryByText } = render(<Label label="Test Label" />);

    // Ensure asterisk is not rendered
    expect(queryByText(" *")).toBeNull();
  });
});
