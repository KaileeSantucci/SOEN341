import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AccountSettings from "../src/accountsettings/src/MyAccountSettings";
import { vi } from "vitest";

// ✅ Predefine currentUser at the top level
const currentUser = {
  id: "user123",
  admin: false,
  username: "johndoe",
  email: "johndoe@example.com",
  firstName: "John",
  lastName: "Doe",
};

// ✅ Mock Zustand store with fixed user
const fetchUserInfoMock = vi.fn();

vi.mock("../src/DirectMessaging/lib/userStore", () => {
  const mockStore = {
    getState: () => ({
      currentUser,
      fetchUserInfo: fetchUserInfoMock,
    }),
  };

  const useUserStore = (selector) => {
    if (typeof selector === "function") {
      return selector(mockStore.getState());
    }
    return mockStore.getState();
  };

  return {
    useUserStore,
  };
});

// ✅ Mock Firebase Auth
vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    onAuthStateChanged: (auth, callback) => {
      callback({ uid: "user123" });
      return () => {};
    },
  };
});

describe("AccountSettings Component", () => {
  test("loads and displays current user info in form", async () => {
    render(<AccountSettings />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Basic User")).toBeInTheDocument();
      expect(screen.getByDisplayValue("johndoe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("johndoe@example.com")).toBeInTheDocument();
      expect(screen.getByDisplayValue("John")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    });

    expect(fetchUserInfoMock).toHaveBeenCalledWith("user123");
  });
});
