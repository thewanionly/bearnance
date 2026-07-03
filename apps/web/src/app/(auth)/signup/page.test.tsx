import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignUpPage from './page';

describe('SignUpPage', () => {
  it('renders the sign up title', () => {
    render(<SignUpPage />);

    expect(
      screen.getByRole('heading', { name: 'Sign Up' })
    ).toBeInTheDocument();
  });

  it('renders a create account action', () => {
    render(<SignUpPage />);

    expect(
      screen.getByRole('button', { name: 'Create Account' })
    ).toBeInTheDocument();
  });

  it('renders a link to the login page', () => {
    render(<SignUpPage />);

    const loginLink = screen.getByRole('link', { name: 'Login' });

    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('does not error when the create account action is clicked', async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(
      screen.getByRole('button', { name: 'Create Account' })
    ).toBeInTheDocument();
  });
});
