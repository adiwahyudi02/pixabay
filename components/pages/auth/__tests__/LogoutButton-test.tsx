import { render, fireEvent, screen } from "@testing-library/react-native";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/auth";
import { LogoutButton } from "../LogoutButton";

// Mocking the useDispatch hook
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

// Mocking the logout action
jest.mock("@/store/slices/auth", () => ({
  logout: jest.fn(),
}));

describe("LogoutButton", () => {
  it("should show confirmation modal when clicking on logout button", () => {
    // Mock the dispatch function
    const dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch); // First cast to unknown, then to jest.Mock

    render(<LogoutButton />);

    // Find the logout button and simulate a press
    fireEvent.press(screen.getByText("Logout"));

    // Verify that the modal is visible
    expect(screen.getByText("Are you sure you want to log out?")).toBeTruthy();
  });

  it("should call logout when confirming the modal", () => {
    // Mock the dispatch function
    const dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch); // First cast to unknown, then to jest.Mock

    render(<LogoutButton />);

    // Open the modal
    fireEvent.press(screen.getByText("Logout"));

    // Find the "Confirm" button in the modal and simulate a press
    fireEvent.press(screen.getByText("Continue"));

    // Verify that the logout action was dispatched
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  it("should close the modal when canceling the logout", () => {
    // Mock the dispatch function
    const dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch); // First cast to unknown, then to jest.Mock

    render(<LogoutButton />);

    // Open the modal
    fireEvent.press(screen.getByText("Logout"));

    // Find the "Cancel" button in the modal and simulate a press
    fireEvent.press(screen.getByText("Cancel"));

    // Verify that the modal is closed (i.e., not visible)
    expect(screen.queryByText("Are you sure you want to log out?")).toBeNull();
  });
});
