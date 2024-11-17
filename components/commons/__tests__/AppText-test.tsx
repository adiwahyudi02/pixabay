import { render } from "@testing-library/react-native";
import { AppText } from "../AppText";
import { theme } from "@/constants/theme";

describe("AppText Component", () => {
  it("renders children text correctly", () => {
    const { getByText } = render(<AppText>Test Text</AppText>);
    expect(getByText("Test Text")).toBeTruthy();
  });

  it("applies default font family from theme", () => {
    const { getByText } = render(<AppText>Default Font</AppText>);
    const textElement = getByText("Default Font");
    expect(textElement.props.style[0].fontFamily).toBe(
      theme.typography.fontFamily.poppins.regular
    );
  });

  it("applies 'Poppins-Bold' font family when fontWeight is 'bold'", () => {
    const { getByText } = render(
      <AppText style={{ fontWeight: "bold" }}>Bold Font</AppText>
    );
    const textElement = getByText("Bold Font");
    expect(textElement.props.style[0].fontFamily).toBe(
      theme.typography.fontFamily.poppins.bold
    );
  });

  it("applies 'Poppins-Medium' font family when fontWeight is 'medium'", () => {
    const { getByText } = render(
      <AppText style={{ fontWeight: "medium" }}>Medium Font</AppText>
    );
    const textElement = getByText("Medium Font");
    expect(textElement.props.style[0].fontFamily).toBe(
      theme.typography.fontFamily.poppins.medium
    );
  });

  it("preserves additional styles passed in", () => {
    const { getByText } = render(
      <AppText style={{ color: "red", fontWeight: "bold" }}>
        Styled Text
      </AppText>
    );
    const textElement = getByText("Styled Text");
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { fontFamily: theme.typography.fontFamily.poppins.bold },
        { color: "red", fontWeight: "bold" },
      ])
    );
  });
});
