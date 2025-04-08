import React from "react";
import { render, screen } from "@testing-library/react";
import UserInfo from "../UserInfo";

// Mock Zustand user store
vi.mock("../../../lib/userStore", () => ({
  useUserStore: jest.fn(),
}));

import { useUserStore } from "../../../lib/userStore";

describe("UserInfo Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    useUserStore.mockReturnValue({
      currentUser: null,
      isLoading: true,
    });

    render(<UserInfo />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state when no user", () => {
    useUserStore.mockReturnValue({
      currentUser: null,
      isLoading: false,
    });

    render(<UserInfo />);
    expect(screen.getByText("Error: No user found.")).toBeInTheDocument();
  });

  test("renders user info when user is loaded", () => {
    useUserStore.mockReturnValue({
      currentUser: {
        username: "KaileeCoder",
        avatar: "https://example.com/avatar.jpg",
      },
      isLoading: false,
    });

    render(<UserInfo />);

    expect(screen.getByText("KaileeCoder")).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute("src", "https://example.com/avatar.jpg");

    // Check if icons rendered
    const icons = screen.getAllByRole("img");
    expect(icons.length).toBeGreaterThan(1); // avatar + icons
  });
});
