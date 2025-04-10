import React from "react";
import { render, screen } from "@testing-library/react";
import ChatList from "../src/DirectMessaging/components/list/chatList/Chatlist";

// ✅ Mock Zustand stores
vi.mock("../src/DirectMessaging/lib/userStore", () => ({
    useUserStore: (selector) =>
        selector({
          currentUser: { id: "user123", username: "Test User" },
        }),      
}));

vi.mock("../src/DirectMessaging/lib/chatStore", () => ({
  useChatStore: () => ({
    changeChat: vi.fn(),
  }),
}));
vi.mock("firebase/firestore", async (importOriginal) => {
    const actual = await importOriginal();
  
    return {
      ...actual,
      doc: vi.fn((dbRef, collection, id) => ({ collection, id })), // Fake ref
  
      onSnapshot: (ref, callback) => {
        callback({
          exists: () => true,
          data: () => ({
            chats: [
              {
                chatId: "chat123",
                receiverId: "receiver123",
                lastMessage: "Hello!",
                updatedAt: Date.now(),
              },
            ],
          }),
        });
        return () => {};
      },
  
      getDoc: vi.fn((ref) => {
        if (ref.collection === "users" && ref.id === "receiver123") {
          return Promise.resolve({
            exists: () => true,
            data: () => ({
              username: "ReceiverUser",
              avatar: "receiver-avatar.png",
            }),
          });
        }
  
        return Promise.resolve({ exists: () => false });
      }),
    };
  });
  
describe("ChatList Component", () => {
    test("fetches and displays chat list on mount", async () => {
        render(<ChatList />);
      
        const username = await screen.findByText("ReceiverUser");
        const lastMessage = await screen.findByText("Hello!");
      
        expect(username).toBeInTheDocument();
        expect(lastMessage).toBeInTheDocument();      
  });
});

