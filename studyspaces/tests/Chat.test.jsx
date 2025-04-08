import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chat from "../src/DirectMessaging/components/chat/Chat";
import { format } from "date-fns";

// Mock Zustand stores
vi.mock("../../lib/chatStore", () => ({
  useChatStore: () => ({
    chatId: "chat123",
    user: {
      id: "user456",
      username: "Test User",
      avatar: "avatar.png",
    },
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
  }),
}));

vi.mock("../../lib/userStore", () => ({
  useUserStore: () => ({
    id: "user123",
    username: "Current User",
  }),
}));

// Mock Firebase
vi.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn().mockResolvedValue({
    exists: () => true,
    data: () => ({
      chats: [{ chatId: "chat123", lastMessage: "", isSeen: false, updatedAt: 0 }],
    }),
  }),
  onSnapshot: (ref, callback) => {
    callback({
      data: () => ({
        messages: [
          {
            senderId: "user456",
            text: "Hello!",
            createdAt: { seconds: 1712563200 }, // example timestamp
          },
        ],
      }),
    });
    return () => {}; // unsubscribe function
  },
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
}));

// Mock EmojiPicker
vi.mock("emoji-picker-react", () => () => <div data-testid="emoji-picker">[Emoji Picker]</div>);

describe("Chat Component", () => {
  test("renders chat messages", async () => {
    render(<Chat />);

    expect(await screen.findByText("Hello!")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText(/Mar|Apr|May/)).toBeInTheDocument(); // date
  });

  test("disables input if user is blocked", () => {
    // Override the store for this test
    jest.mock("../../lib/chatStore", () => ({
      useChatStore: () => ({
        chatId: "chat123",
        user: { id: "user456", username: "Test User" },
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      }),
    }));

    render(<Chat />);
    const input = screen.getByPlaceholderText(/you cannot send a message/i);
    expect(input).toBeDisabled();
  });

  test("can type and clear message input", async () => {
    render(<Chat />);

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Hey!" } });
    expect(input.value).toBe("Hey!");

    const sendBtn = screen.getByRole("button", { name: /send/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(input.value).toBe(""); // should be reset after send
    });
  });
});
