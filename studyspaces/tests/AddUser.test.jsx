import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddUser from "../src/DirectMessaging/components/list/chatList/addUser/addUser";

// ✅ Mock Zustand user store
vi.mock("../src/DirectMessaging/lib/userStore", () => ({
  useUserStore: () => ({
    currentUser: { id: "user123", username: "CurrentUser" },
  }),
}));

// ✅ Mock Zustand chat store
const startChatMock = vi.fn();
vi.mock("../src/DirectMessaging/lib/chatStore", () => ({
  useChatStore: () => ({
    startChat: startChatMock,
  }),
}));

// ✅ Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// ✅ Mock Firestore
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    doc: vi.fn(),
    getDoc: vi.fn().mockResolvedValue({
      exists: () => false,
      data: () => ({}),
    }),
    getDocs: vi.fn().mockResolvedValue({
      empty: false,
      docs: [
        {
          data: () => ({
            id: "receiver456",
            username: "ReceiverUser",
          }),
        },
      ],
    }),
  };
});

describe("AddUser Component", () => {
  test("searches and adds a user successfully", async () => {
    render(<AddUser />);

    const input = screen.getByPlaceholderText("Enter user ID or username");
    fireEvent.change(input, { target: { value: "ReceiverUser" } });

    const searchBtn = screen.getByText("Search");
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText("ReceiverUser")).toBeInTheDocument();
    });

    const addBtn = screen.getByText("Add User");
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(startChatMock).toHaveBeenCalledWith("receiver456");
    });
  });
});
