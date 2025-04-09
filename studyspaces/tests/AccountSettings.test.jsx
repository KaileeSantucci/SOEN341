import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AccountSettings from "../src/accountsettings/src/MyAccountSettings";
import { onAuthStateChanged } from "firebase/auth";

// ✅ Mock Zustand store
const mockUser = {
  id: "user123",
  admin: true,
  username: "johndoe",
  email: "johndoe@example.com",
  firstName: "John",
  lastName: "Doe",
};

const fetchUserInfoMock = vi.fn();

vi.mock("../src/DirectMessaging/lib/userStore", () => ({
  useUserStore: vi.fn(() => ({
    currentUser: mockUser,
    fetchUserInfo: fetchUserInfoMock,
  })),
}));

// ✅ Mock Firebase Auth
vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    onAuthStateChanged: vi.fn((auth, callback) => {
      callback({ uid: mockUser.id }); // Simulate a logged-in user
      return () => {};
    }),
  };
});

describe("AccountSettings Component", () => {
  test("loads and displays current user info in form", async () => {
    render(<AccountSettings />);

    await waitFor(() => {
      // Check fields are filled with the correct values
      expect(screen.getByDisplayValue("Admin")).toBeInTheDocument();
      expect(screen.getByDisplayValue("johndoe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("johndoe@example.com")).toBeInTheDocument();
      expect(screen.getByDisplayValue("John")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    });

    // Make sure fetchUserInfo was called with correct UID
    expect(fetchUserInfoMock).toHaveBeenCalledWith("user123");
  });
});
