import { render, screen } from '@testing-library/react';

import { AuthCard } from './AuthCard';

describe('AuthCard', () => {
  it('renders the title as a heading', () => {
    render(<AuthCard title="Login">content</AuthCard>);

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <AuthCard title="Login">
        <button type="button">Submit</button>
      </AuthCard>
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
