import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import AccountSettings from "../src/accountsettings/src/MyAccountSettings";

// ✅ Zustand mock
const mockFetchUserInfo = vi.fn();

vi.mock("../../src/DirectMessaging/lib/userStore", () => {
  return {
    useUserStore: (selector) => {
      const state = {
        currentUser: null,
        fetchUserInfo: mockFetchUserInfo,
      };
      return typeof selector === "function" ? selector(state) : state;
    },
  };
});

// ✅ Firebase mock
vi.mock("firebase/auth", () => {
  return {
    onAuthStateChanged: (auth, callback) => {
      callback({ uid: "abc123" }); // simulate signed-in user
      return () => {}; // cleanup
    },
    getAuth: () => ({}),
  };
});

describe("AccountSettings - Firebase fetch only", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls fetchUserInfo with correct UID on mount", async () => {
    render(
      <MemoryRouter>
        <AccountSettings />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockFetchUserInfo).toHaveBeenCalledWith("abc123");
    });
  });
});
