import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SearchInput } from "../SearchInput";

describe("SearchInput Component", () => {
  it("renders correctly with initial value", () => {
    const { getByTestId } = render(
      <SearchInput value="Test" onChange={() => {}} />
    );

    const input = getByTestId("search-input");
    expect(input.props.value).toBe("Test");
  });

  it("calls onChange when text is entered after debounce", async () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <SearchInput value="" onChange={onChangeMock} />
    );

    const input = getByTestId("search-input");
    fireEvent.changeText(input, "Hello");

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith("Hello");
    });
  });

  it("calls onChange with an empty string when reset button is pressed", async () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <SearchInput value="Test" onChange={onChangeMock} />
    );

    const input = getByTestId("search-input");
    const resetButton = getByTestId("reset-button");

    fireEvent.changeText(input, "New Value");
    // Simulate pressing the reset button
    fireEvent.press(resetButton);

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    await waitFor(() => {
      // Expect the reset to call onChange with an empty string
      expect(onChangeMock).toHaveBeenCalledWith("");
    });

    // Check if the input is cleared
    expect(input.props.value).toBe("");
  });

  it("debounces the input change", async () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <SearchInput value="" onChange={onChangeMock} />
    );

    const input = getByTestId("search-input");
    fireEvent.changeText(input, "Hello");

    jest.runAllTimers(); // Fast-forward timers

    expect(onChangeMock).toHaveBeenCalledTimes(1); // onChange should be called once
    expect(onChangeMock).toHaveBeenCalledWith("Hello");
  });
});
