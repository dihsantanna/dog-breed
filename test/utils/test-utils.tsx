/* eslint-disable no-multiple-empty-lines */
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach } from 'vitest';

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
    history: {
      push: (to: string) => window.history.replaceState({}, 'Test page', to),
      location: () => window.location,
    },
  });
};

export * from '@testing-library/react';
export { renderWithRouter as render };

