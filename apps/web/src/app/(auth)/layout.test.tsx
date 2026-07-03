import { render, screen } from '@testing-library/react';

import AuthLayout from './layout';

describe('AuthLayout', () => {
  it('renders children within the layout', () => {
    render(
      <AuthLayout>
        <p>Login form</p>
      </AuthLayout>
    );

    expect(screen.getByText('Login form')).toBeInTheDocument();
  });

  it('renders logo links pointing to home', () => {
    render(
      <AuthLayout>
        <p>Login form</p>
      </AuthLayout>
    );

    const homeLinks = screen.getAllByRole('link', { name: 'Bearnance' });

    expect(homeLinks.length).toBeGreaterThan(0);
    for (const link of homeLinks) {
      expect(link).toHaveAttribute('href', '/');
    }
  });

  it('renders the marketing copy', () => {
    render(
      <AuthLayout>
        <p>Login form</p>
      </AuthLayout>
    );

    expect(
      screen.getByText('Keep track of your money and save for your future')
    ).toBeInTheDocument();
  });
});
