import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return ({
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: BrowserRouter,
    }),
  });
};

export * from '@testing-library/react';

export { renderWithRouter as render };
