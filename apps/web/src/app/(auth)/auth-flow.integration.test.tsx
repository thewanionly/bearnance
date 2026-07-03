import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthLayout from './layout';
import LogInPage from './login/page';
import SignUpPage from './signup/page';

describe('auth pages integration', () => {
  it('renders the login page inside the auth layout with working navigation to sign up', async () => {
    const user = userEvent.setup();

    render(
      <AuthLayout>
        <LogInPage />
      </AuthLayout>
    );

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(
      screen.getByText('Keep track of your money and save for your future')
    ).toBeInTheDocument();

    const signUpLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(signUpLink).toHaveAttribute('href', '/signup');

    await user.click(signUpLink);
  });

  it('renders the sign up page inside the auth layout with working navigation to login', async () => {
    const user = userEvent.setup();

    render(
      <AuthLayout>
        <SignUpPage />
      </AuthLayout>
    );

    expect(
      screen.getByRole('heading', { name: 'Sign Up' })
    ).toBeInTheDocument();

    const loginLink = screen.getByRole('link', { name: 'Login' });
    expect(loginLink).toHaveAttribute('href', '/login');

    await user.click(loginLink);
  });
});
