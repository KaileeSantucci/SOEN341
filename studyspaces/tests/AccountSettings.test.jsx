import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AccountSettings from '../src/accountsettings/src/MyAccountSettings.jsx';

// ✅ Mock Zustand store
vi.mock('../../src/DirectMessaging/lib/userStore', () => ({
  useUserStore: vi.fn((selector) =>
    selector({
      currentUser: {
        admin: true,
        username: 'testuser',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
      },
      fetchUserInfo: vi.fn(),
    })
  ),
}));

// ✅ Mock Firebase auth
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({ uid: 'abc123' });
    return () => {};
  }),
  getAuth: () => ({}),
}));

describe('AccountSettings component', () => {
  it('renders account info from user store', () => {
    render(
      <MemoryRouter>
        <AccountSettings />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/user type/i)).toHaveValue('Basic User');
    expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/first name/i)).toHaveValue('Jane');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('jane@example.com');
  });

  it('lets user update first and last name', () => {
    render(
      <MemoryRouter>
        <AccountSettings />
      </MemoryRouter>
    );

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);

    fireEvent.change(firstNameInput, { target: { value: 'Jessica' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });

    expect(firstNameInput.value).toBe('Jessica');
    expect(lastNameInput.value).toBe('Smith');
  });
});
