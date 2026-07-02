import { appName, primaryActionLabel } from '#lib/app-copy';

import { render, screen } from '@testing-library/react';

import Home from './page';

describe('Home', () => {
  it('renders the app logo and primary action', () => {
    render(<Home />);

    expect(screen.getByRole('img', { name: appName })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: primaryActionLabel })
    ).toBeInTheDocument();
  });
});
