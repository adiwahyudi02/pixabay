import { render } from "@testing-library/react-native";
import { theme } from "@/constants/theme";
import { AppText } from "../AppText";
import { Screen } from "../Screen";

describe("Screen Component", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <Screen>
        <AppText>Test Content</AppText>
      </Screen>
    );

    // Check if the content is rendered correctly
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("should apply correct styles", () => {
    const { getByTestId } = render(
      <Screen>
        <AppText>Test Content</AppText>
      </Screen>
    );

    const container = getByTestId("screen-container");

    // Check if the container has the correct styles
    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
      })
    );
  });
});
