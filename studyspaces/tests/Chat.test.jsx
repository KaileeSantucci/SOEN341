import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chat from "../src/DirectMessaging/components/chat/Chat";

// ✅ Mock Zustand stores
vi.mock("../src/DirectMessaging/lib/userStore", () => ({
  useUserStore: () => ({
    currentUser: { id: "user123", username: "CurrentUser" },
  }),
}));

vi.mock("../src/DirectMessaging/lib/chatStore", () => ({
  useChatStore: () => ({
    chatId: "chat123",
    user: { id: "user456", username: "Receiver" },
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
  }),
}));

// ✅ Mock Firestore
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal();

  const updateDocMock = vi.fn();
  const arrayUnionMock = vi.fn();

  return {
    ...actual,
    doc: vi.fn(() => ({})),
    getDoc: vi.fn().mockResolvedValue({
      exists: () => true,
      data: () => ({
        chats: [
          {
            chatId: "chat123",
            lastMessage: "",
            isSeen: false,
            updatedAt: 0,
          },
        ],
      }),
    }),
    updateDoc: updateDocMock,
    arrayUnion: arrayUnionMock,
    onSnapshot: vi.fn(() => () => {}),
    // 👇 Expose mocks so we can test later
    __esModule: true,
    __mocks: {
      updateDocMock,
      arrayUnionMock,
    },
  };
});

// ✅ Mock Emoji Picker
vi.mock("emoji-picker-react", () => ({
  default: () => <div data-testid="emoji-picker">[Emoji Picker]</div>,
}));

describe("Chat Component - Send Message", () => {
  test("sends message and clears input", async () => {
    const { __mocks } = await import("firebase/firestore");

    render(<Chat />);

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Hello there!" } });

    const sendBtn = screen.getByRole("button", { name: /send/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(__mocks.updateDocMock).toHaveBeenCalled();
      expect(__mocks.arrayUnionMock).toHaveBeenCalled();
      expect(input.value).toBe("");
    });
  });
});
