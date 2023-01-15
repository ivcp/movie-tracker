import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '../AuthForm';
import { QueryClientProvider, QueryClient } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

describe('Auth component', () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_PUBLIC_GOOGLE_API_TOKEN}
      >
        <QueryClientProvider client={queryClient}>
          <AuthForm />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    );
  });

  it('renders login form initially', async () => {
    screen.getByRole('heading', /log in/i);
    screen.getByPlaceholderText(/email/i);
    screen.getByPlaceholderText(/password/i);
    expect(
      screen.queryByPlaceholderText(/first name/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/last name/i)).not.toBeInTheDocument();
  });

  it('changes form when clicked to show register', async () => {
    screen.getByRole('heading', { name: /log in/i });
    const user = userEvent.setup();
    const changeFormBtn = screen.getByRole('button', {
      name: /don't have an account\? register/i,
    });

    await user.click(changeFormBtn);
    screen.getByPlaceholderText(/first name/i);
    screen.getByPlaceholderText(/last name/i);
    expect(
      screen.queryByRole('heading', { name: /log in/i })
    ).not.toBeInTheDocument();
  });
  it('changes password visibility', async () => {
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    const user = userEvent.setup();
    const showPasswordBtn = screen.getByRole('button', {
      name: /show password/i,
    });
    await user.click(showPasswordBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
