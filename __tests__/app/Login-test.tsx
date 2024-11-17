import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { authenticateUser } from "@/store/slices/auth";
import Login from "@/app/login";

// Mocking necessary modules
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("expo-router", () => ({
  Stack: {
    Screen: jest.fn(),
  },
  useRouter: jest.fn(),
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

jest.mock("@/store/slices/auth", () => ({
  authenticateUser: jest.fn(),
}));

describe("Login", () => {
  let dispatchMock: jest.Mock;
  let pushMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    pushMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    const { getByTestId } = render(<Login />);

    // Check that the form elements render
    expect(getByTestId("login-screen")).toBeTruthy();
    expect(getByTestId("login-container")).toBeTruthy();
    expect(getByTestId("login-title")).toBeTruthy();
    expect(getByTestId("username-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
    expect(getByTestId("login-button")).toBeTruthy();
  });

  it("submits the form and navigates on success", async () => {
    const mockAuthResponse = { username: "testuser", password: "password" };
    (authenticateUser as jest.Mock).mockResolvedValue(mockAuthResponse);

    const { getByTestId } = render(<Login />);

    // Simulate user entering data into the form
    fireEvent.changeText(getByTestId("username-input"), "testuser");
    fireEvent.changeText(getByTestId("password-input"), "password");

    // Simulate form submission
    fireEvent.press(getByTestId("login-button"));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(
        authenticateUser("testuser", "password")
      );
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  it("displays validation errors when the form is submitted with missing fields", async () => {
    const { getByTestId, getByText } = render(<Login />);

    // Simulate form submission with empty fields
    fireEvent.press(getByTestId("login-button"));

    // Check that the validation errors are displayed
    await waitFor(() => {
      expect(getByText("Username is required")).toBeTruthy();
      expect(getByText("Password is required")).toBeTruthy();
    });
  });
});
