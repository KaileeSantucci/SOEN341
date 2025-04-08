import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../src/UserAuthentication/login/Login.jsx';
import { vi } from 'vitest';

vi.mock('firebase/auth', () => ({
    getAuth: () => ({}), // mock getAuth so it doesn't crash
    signInWithEmailAndPassword: vi.fn(() =>
      Promise.resolve({ user: { uid: '123' } })
    ),
  }));  

// Mock Firebase setup
vi.mock('../../../DirectMessaging/lib/firebase.js', () => ({
  auth: {},
  db: {},
}));

// Mock useAuthentication to simulate not being logged in
vi.mock('../userauthentication.js', () => ({
  useAuthentication: () => ({ user: null, loading: false }),
}));

describe('Login component', () => {
  it('renders email and password inputs', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('allows user to type in inputs', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('mypassword');
  });
});
