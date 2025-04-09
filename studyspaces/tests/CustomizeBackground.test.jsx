import { render, fireEvent, screen } from "@testing-library/react";
import CustomizeBackground from "../src/HomePage/pages/CustomizeBackground";

// Mocks for localStorage
beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn(() => null);
});

describe("CustomizeBackground Component", () => {
  test("renders preexisting images and apply button", () => {
    render(<CustomizeBackground />);

    // Check for heading
    expect(screen.getByText("Customize Your Background")).toBeInTheDocument();

    // Check for the apply button
    expect(screen.getByRole("button", { name: /apply background/i })).toBeInTheDocument();

    // Check for all predefined image labels
    expect(screen.getByText("Background 1")).toBeInTheDocument();
    expect(screen.getByText("Background 2")).toBeInTheDocument();
    expect(screen.getByText("Background 3")).toBeInTheDocument();
    expect(screen.getByText("Background 4")).toBeInTheDocument();
    expect(screen.getByText("Background 5")).toBeInTheDocument();
    expect(screen.getByText("Background 6")).toBeInTheDocument();
  });

  test("selects a background and saves it in localStorage on apply", () => {
    render(<CustomizeBackground />);

    // Select a background
    const backgroundOption = screen.getByText("Background 1");
    fireEvent.click(backgroundOption);

    // Apply background
    const applyButton = screen.getByRole("button", { name: /apply background/i });
    fireEvent.click(applyButton);

    // localStorage should have been called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "customBackground",
      "/src/HomePage/assets/darkacademia.jpg"
    );
  });

  test("loads saved background on mount if available", () => {
    localStorage.getItem.mockReturnValue("/mock/saved-image.jpg");
    const appContainer = document.createElement("div");
    appContainer.className = "app-container";
    document.body.appendChild(appContainer);

    render(<CustomizeBackground />);

    expect(localStorage.getItem).toHaveBeenCalledWith("customBackground");
    expect(appContainer.style.backgroundImage).toContain("/mock/saved-image.jpg");

    document.body.removeChild(appContainer);
  });
});
