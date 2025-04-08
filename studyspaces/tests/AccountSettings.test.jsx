import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AccountSettings from "../src/accountsettings/src/MyAccountSettings";

// Mocks
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(),
}));
vi.mock("../../DirectMessaging/lib/firebase", () => ({
  auth: {},
}));

// Mock zustand store
const mockFetchUserInfo = jest.fn();
const mockUser = {
  admin: true,
  username: "mockUser123",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
};

vi.mock("../../DirectMessaging/lib/userStore", () => ({
  useUserStore: (selector) => {
    return selector
      ? selector({ currentUser: mockUser, fetchUserInfo: mockFetchUserInfo })
      : { currentUser: mockUser, fetchUserInfo: mockFetchUserInfo };
  },
}));

import { onAuthStateChanged } from "firebase/auth";

describe("AccountSettings Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches user info on auth state change and populates form", async () => {
    const mockAuthCallback = jest.fn();
    onAuthStateChanged.mockImplementation((_, callback) => {
      // simulate a logged-in user
      callback({ uid: "test-user-id" });
      return () => {}; // cleanup
    });

    render(
      <BrowserRouter>
        <AccountSettings />
      </BrowserRouter>
    );

    // Wait for async effects to finish
    await waitFor(() => {
      expect(mockFetchUserInfo).toHaveBeenCalledWith("test-user-id");

      // Check if form fields display fetched user data
      expect(screen.getByDisplayValue("mockUser123")).toBeInTheDocument(); // Username
      expect(screen.getByDisplayValue("Jane")).toBeInTheDocument(); // First Name
      expect(screen.getByDisplayValue("Doe")).toBeInTheDocument(); // Last Name
      expect(screen.getByDisplayValue("jane@example.com")).toBeInTheDocument(); // Email
      expect(screen.getByDisplayValue("Admin")).toBeInTheDocument(); // User Type
    });
  });
});
