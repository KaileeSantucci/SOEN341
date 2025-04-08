import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../src/UserAuthentication/registration/Register"; // adjust path as needed

// Mocks
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(() => ({})),
  setDoc: jest.fn(),
}));

jest.mock("../../DirectMessaging/lib/firebase", () => ({
  auth: {},
  db: {},
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

describe("Register component - registration feature", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("successful registration triggers Firebase calls and navigation", async () => {
    // Mock a successful registration
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: "test-uid" },
    });
    setDoc.mockResolvedValue();

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/User Name/i), {
      target: { value: "alicesmith" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "alice@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "securepassword123" },
    });

    fireEvent.click(screen.getByText(/Register Now!/i));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        {},
        "alice@example.com",
        "securepassword123"
      );
      expect(setDoc).toHaveBeenCalledTimes(2); // user doc + userchats doc
      expect(toast.success).toHaveBeenCalledWith("Account created! You can now log in.");
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("failed registration shows error toast", async () => {
    const mockError = new Error("Registration failed");
    createUserWithEmailAndPassword.mockRejectedValue(mockError);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Bob" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Brown" },
    });
    fireEvent.change(screen.getByLabelText(/User Name/i), {
      target: { value: "bobbrown" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "bob@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Register Now!/i));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Registration failed");
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
