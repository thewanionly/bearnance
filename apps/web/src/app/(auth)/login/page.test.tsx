import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LogInPage from './page';

describe('LogInPage', () => {
  it('renders the login title', () => {
    render(<LogInPage />);

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders a login action linking to the home page', () => {
    render(<LogInPage />);

    const loginLink = screen.getByRole('link', { name: 'Login' });

    expect(loginLink).toHaveAttribute('href', '/?logged-in=true');
  });

  it('renders a link to the sign up page', () => {
    render(<LogInPage />);

    const signUpLink = screen.getByRole('link', { name: 'Sign Up' });

    expect(signUpLink).toHaveAttribute('href', '/signup');
  });

  it('does not error when the login action is clicked', async () => {
    const user = userEvent.setup();
    render(<LogInPage />);

    await user.click(screen.getByRole('link', { name: 'Login' }));

    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
  });
});
