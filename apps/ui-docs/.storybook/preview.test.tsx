import type { Decorator } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import preview from './preview';

const Story = () => <button type="button">Story content</button>;

function getPreviewDecorator(): Decorator {
  const decorators = preview.decorators;

  if (Array.isArray(decorators)) {
    const [decorator] = decorators;

    if (decorator == null) {
      throw new Error('Expected Storybook preview to define a decorator.');
    }

    return decorator as Decorator;
  }

  if (decorators == null) {
    throw new Error('Expected Storybook preview to define a decorator.');
  }

  return decorators as Decorator;
}

describe('Storybook preview', () => {
  it('configures accessibility checks', () => {
    expect(preview.parameters?.a11y).toMatchObject({
      test: 'todo',
    });
  });

  it('renders non-mobile stories directly', () => {
    const decorator = getPreviewDecorator();

    render(<>{decorator(Story, { parameters: {} } as never)}</>);

    expect(
      screen.getByRole('button', { name: 'Story content' })
    ).toBeInTheDocument();
  });

  it('renders mobile stories inside a mobile frame', () => {
    const decorator = getPreviewDecorator();
    render(
      <>
        {decorator(Story, {
          parameters: { platform: 'mobile' },
        } as never)}
      </>
    );

    expect(
      screen.getByRole('button', { name: 'Story content' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('mobile-canvas')).toHaveStyle({
      display: 'grid',
      minHeight: '100vh',
    });
  });
});
