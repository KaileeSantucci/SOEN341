import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import CustomizeBackground from "../src/HomePage/pages/CustomizeBackground";

// Clean up DOM after each test
afterEach(() => {
  cleanup(); // removes React render
  document.body.innerHTML = ""; // removes any manually injected DOM
});

// Setup before every test
beforeEach(() => {
  // Mock and inject .app-container into the DOM
  const div = document.createElement("div");
  div.className = "app-container";
  document.body.appendChild(div);

  // Inject .main-content into jsdom (for CustomizeBackground.jsx)
  const mainDiv = document.createElement("div");
  mainDiv.className = "main-content";
  document.body.appendChild(mainDiv);

  // Spy on localStorage
  vi.spyOn(Storage.prototype, "setItem");
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
});

describe("CustomizeBackground Component", () => {
  test("renders preexisting images and apply button", () => {
    render(<CustomizeBackground />);

    expect(screen.getByText("Customize Your Background")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /apply background/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Background 1")).toBeInTheDocument();
    expect(screen.getByText("Background 2")).toBeInTheDocument();
    expect(screen.getByText("Background 3")).toBeInTheDocument();
    expect(screen.getByText("Background 4")).toBeInTheDocument();
    expect(screen.getByText("Background 5")).toBeInTheDocument();
    expect(screen.getByText("Background 6")).toBeInTheDocument();
  });

  test("selects a background and saves it in localStorage on apply", () => {
    render(<CustomizeBackground />);

    const backgroundOption = screen.getByText("Background 1");
    fireEvent.click(backgroundOption);

    const applyButton = screen.getByRole("button", {
      name: /apply background/i,
    });
    fireEvent.click(applyButton);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "customBackground",
      "/src/HomePage/assets/darkacademia.jpg"
    );
  });

  test("loads saved background on mount if available", () => {
    // Manually override getItem for this one test
    Storage.prototype.getItem.mockReturnValue("/mock/saved-image.jpg");

    const appContainer = document.querySelector(".app-container");

    render(<CustomizeBackground />);

    expect(localStorage.getItem).toHaveBeenCalledWith("customBackground");
    expect(appContainer.style.backgroundImage).toContain("/mock/saved-image.jpg");
  });
});
