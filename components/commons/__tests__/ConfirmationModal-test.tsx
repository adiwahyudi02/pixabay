import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ConfirmationModal } from "../ConfirmationModal";

describe("ConfirmationModal", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  it("should render modal when visible is true", () => {
    const { getByText } = render(
      <ConfirmationModal
        visible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Are you sure?"
      />
    );

    // Check if the message is displayed
    expect(getByText("Are you sure?")).toBeTruthy();

    // Check if buttons are displayed
    expect(getByText("Cancel")).toBeTruthy();
    expect(getByText("Continue")).toBeTruthy();
  });

  it("should not render modal when visible is false", () => {
    const { queryByText } = render(
      <ConfirmationModal
        visible={false}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Are you sure?"
      />
    );

    // Modal and buttons should not be rendered
    expect(queryByText("Are you sure?")).toBeNull();
    expect(queryByText("Cancel")).toBeNull();
    expect(queryByText("Continue")).toBeNull();
  });

  it("should call onCancel when Cancel button is pressed", async () => {
    const { getByText } = render(
      <ConfirmationModal
        visible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Are you sure?"
      />
    );

    // Find the Cancel button and press it
    const cancelButton = getByText("Cancel");
    fireEvent.press(cancelButton);

    // Wait for onCancel to be called
    await waitFor(() => expect(mockOnCancel).toHaveBeenCalledTimes(1));
  });

  it("should call onConfirm when Continue button is pressed", async () => {
    const { getByText } = render(
      <ConfirmationModal
        visible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Are you sure?"
      />
    );

    // Find the Continue button and press it
    const continueButton = getByText("Continue");
    fireEvent.press(continueButton);

    // Wait for onConfirm to be called
    await waitFor(() => expect(mockOnConfirm).toHaveBeenCalledTimes(1));
  });
});
