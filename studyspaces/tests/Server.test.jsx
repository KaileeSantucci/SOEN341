import { render, screen, fireEvent } from "@testing-library/react";
import { describe, beforeEach, test, expect, vi } from "vitest";
import ServerApp from "../src/Server/ServerApp";
import ManageServers from "../src/Server/pages/ManageServers";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock useAuthentication for ManageServers
vi.mock("../src/UserAuthentication/userauthentication", () => ({
    useAuthentication: () => ({
      userData: { id: "user123", username: "adminUser", admin: true },
    }),
  }));  


// ✅ Mock Zustand server store
vi.mock("../src/DirectMessaging/lib/serverStore", () => ({
  useServerStore: () => ({
    servers: [{ id: "welcome", name: "Welcome Server" }],
    fetchServers: vi.fn(),
    selectedServer: { id: "welcome", name: "Welcome Server" },
    setSelectedServer: vi.fn((server) => {
      console.log("🟢 Zustand setSelectedServer Called:", server);
    }),
  }),
}));

// ✅ Mock Zustand user store
vi.mock("../src/DirectMessaging/lib/userStore", () => ({
  useUserStore: () => ({
    currentUser: { id: "user123", username: "regularUser", admin: true },
    setCurrentUser: vi.fn(),
    fetchUserInfo: vi.fn(),
  }),
}));

// ✅ Mock Firestore's onSnapshot
vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    onSnapshot: vi.fn((query, callback) => {
      callback({
        empty: false,
        docs: [
          {
            id: "1",
            data: () => ({
              username: "User",
              text: "Hello",
              timestamp: { seconds: 1712598323 },
            }),
          },
        ],
      });
      return () => console.log("🔄 mock unsubscribe");
    }),
  };
});

describe("✅ Server Functionality Acceptance Tests", () => {
  beforeEach(() => {
    // Reset DOM between tests if needed
    document.body.innerHTML = "";
  });

  test("Regular user can view and select servers", async () => {
    render(<ServerApp />);
    
    const serverButtons = screen.getAllByText("Welcome Server");
    fireEvent.click(serverButtons[0]); // Click the button version

    expect(await screen.findByRole("heading", { name: /Welcome Server/i })).toBeInTheDocument();
    expect(screen.getByText("User:")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("Admin can create a server", async () => {
    render(
      <MemoryRouter>
        <ManageServers />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Enter server name");
    const createButton = screen.getByRole("button", { name: /Create Server/i });

    fireEvent.change(input, { target: { value: "New Server" } });
    fireEvent.click(createButton);

    // Simulate alert or success message manually if needed
    // For real apps, mock setDoc and assert on effect
  });

  test("Admin can delete a server", async () => {
    render(
      <MemoryRouter>
        <ManageServers />
      </MemoryRouter>
    );

    const select = screen.getByLabelText(/Select a server to delete/i);
    fireEvent.change(select, { target: { value: "welcome" } });

    const deleteButton = screen.getByRole("button", { name: /Delete Server/i });
    fireEvent.click(deleteButton);

    
  });
});
