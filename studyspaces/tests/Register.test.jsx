// tests/Register.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Registration from '../src/UserAuthentication/registration/Register.jsx';

// ✅ Mock Firebase Auth methods inline (do not declare mockCreateUser at the top level)
vi.mock('firebase/auth', () => {
  // Define the mock function inside the factory so it's available when the module is hoisted
  const mockCreateUser = vi.fn(() =>
    Promise.resolve({ user: { uid: 'abc123' } })
  );

  return {
    createUserWithEmailAndPassword: mockCreateUser,
    getAuth: () => ({}),
    __esModule: true,
    // Expose the mock for assertions
    mockCreateUser,
  };
});

// Now import the mocked module so we can access its exports
import * as firebaseAuth from 'firebase/auth';

// ✅ Mock custom authentication hook
vi.mock('../src/UserAuthentication/userauthentication.js', () => ({
  useAuthentication: () => ({ user: null, loading: false }),
}));

describe('Registration component', () => {
  // Test 1: UI rendering
  it('renders form inputs and register button', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  // Test 2: Typing into fields
  it('allows typing in form fields', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/user name/i), { target: { value: 'janedoe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secure123' } });

    expect(screen.getByLabelText(/first name/i).value).toBe('Jane');
    expect(screen.getByLabelText(/last name/i).value).toBe('Doe');
    expect(screen.getByLabelText(/user name/i).value).toBe('janedoe');
    expect(screen.getByLabelText(/email/i).value).toBe('jane@example.com');
    expect(screen.getByLabelText(/password/i).value).toBe('secure123');
  });

  // Test 3: Submitting registration and checking Firebase registration
  it('registers a new user successfully', async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/user name/i), { target: { value: 'janedoe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secure123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for the async Firebase call and assert it was called with the correct arguments
    await waitFor(() => {
      expect(firebaseAuth.mockCreateUser).toHaveBeenCalledWith(
        {}, // mocked getAuth()
        'jane@example.com',
        'secure123'
      );
    });
  });
});
