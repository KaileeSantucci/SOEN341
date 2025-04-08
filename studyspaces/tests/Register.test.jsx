import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import Registration from '../src/UserAuthentication/registration/Register.jsx';

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(() =>
    Promise.resolve({ user: { uid: 'abc123' } })
  ),
  getAuth: () => ({}),
}));

vi.mock('../src/UserAuthentication/userauthentication.js', () => ({
  useAuthentication: () => ({ user: null, loading: false }),
}));

describe('Registration component', () => {
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
});
