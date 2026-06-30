import type { CSSProperties } from 'react';

import '@bearnance/ui-web/globals.css';
import type { Preview } from '@storybook/react-vite';

const mobileCanvasStyle: CSSProperties = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: 24,
  background: '#f3f4f6',
};

const mobileFrameStyle: CSSProperties = {
  width: 390,
  minHeight: 844,
  maxWidth: '100%',
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: 32,
  overflow: 'hidden',
};

const mobileContentStyle: CSSProperties = {
  padding: 24,
};

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      if (parameters.platform !== 'mobile') {
        return <Story />;
      }

      return (
        <div style={mobileCanvasStyle}>
          <div style={mobileFrameStyle}>
            <div style={mobileContentStyle}>
              <Story />
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
