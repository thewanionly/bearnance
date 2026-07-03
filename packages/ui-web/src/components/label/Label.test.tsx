import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Label.stories';

const { Default } = composeStories(stories);

describe('Label', () => {
  it('renders a label element with the token-backed styling', () => {
    render(<Default />);

    const label = screen.getByText('Email');

    expect(label).toHaveAttribute('data-slot', 'label');
    expect(label).toHaveAttribute('for', 'email');
    expect(label).toHaveClass('text-preset-5');
    expect(label).toHaveClass('font-bold');
    expect(label).toHaveClass('text-grey-500');
  });

  it('associates with a form control via htmlFor', () => {
    render(
      <>
        <Default htmlFor="email-input" />
        <input id="email-input" />
      </>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
