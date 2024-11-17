import { render, waitFor, screen } from "@testing-library/react-native";
import { AuthProtect } from "@/components/commons/AuthProtect";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "expo-router"; // Ensure usePathname is imported here
import { AppText } from "@/components/commons/AppText";

// Mock dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/store/slices/auth", () => ({
  checkAuthentication: jest.fn(),
  selectIsAuthenticated: jest.fn(),
}));

describe("AuthProtect", () => {
  it("should render children if authenticated", async () => {
    // Mock the authentication state to be true
    (useSelector as unknown as jest.Mock).mockReturnValue(true); // Mock useSelector to return true (authenticated)
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn()); // Mock useDispatch as jest.Mock
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <AuthProtect>
        <AppText>Protected Content</AppText>
      </AuthProtect>
    );

    // Wait for the authentication effect to run
    await waitFor(() =>
      expect(screen.getByText("Protected Content")).toBeTruthy()
    );
  });

  it("should redirect unauthenticated users to the login page", async () => {
    // Mock the authentication state to be false
    (useSelector as unknown as jest.Mock).mockReturnValue(false); // Mock useSelector to return false (unauthenticated)
    const pushMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn()); // Mock useDispatch as jest.Mock
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <AuthProtect>
        <AppText>Protected Content</AppText>
      </AuthProtect>
    );

    // Wait for the redirect effect to run
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
  });

  it("should redirect authenticated users away from the login page", async () => {
    // Mock the authentication state to be true
    (useSelector as unknown as jest.Mock).mockReturnValue(true); // Mock useSelector to return true (authenticated)
    const pushMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn()); // Mock useDispatch as jest.Mock
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (usePathname as jest.Mock).mockReturnValue("/login");

    render(
      <AuthProtect>
        <AppText>Protected Content</AppText>
      </AuthProtect>
    );

    // Wait for the redirect effect to run
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/"));
  });
});
