import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ManageServers from "../src/Server/pages/ManageServers";
import { vi } from "vitest";

// ✅ Mock useAuthentication to simulate an admin user
vi.mock("../src/UserAuthentication/userauthentication", () => ({
  useAuthentication: () => ({
    userData: {
      uid: "admin123",
      admin: true,
    },
  }),
}));

// ✅ Mock Firestore functions
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    collection: vi.fn(() => "mockCollection"),
    doc: vi.fn(() => "mockDoc"),
    getDocs: vi.fn().mockResolvedValue({
      docs: [
        { id: "server1", data: () => ({ name: "Test Server 1" }) },
        { id: "server2", data: () => ({ name: "Test Server 2" }) },
      ],
    }),
    setDoc: vi.fn(),
    deleteDoc: vi.fn(),
  };
});

// ✅ Mock navigate to prevent errors
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("ManageServers component - Admin Access", () => {
  it("renders create and manage server sections when user is admin", async () => {
    render(
      <MemoryRouter>
        <ManageServers />
      </MemoryRouter>
    );

    // Check for Create Server form
    expect(screen.getByText(/Create a New Server/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter server name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create server/i })).toBeInTheDocument();

    // Check for Manage Servers section
    expect(screen.getByText(/Manage Servers/i)).toBeInTheDocument();
    expect(screen.getByText(/Select a server to delete/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete server/i })).toBeInTheDocument();
  });
});
