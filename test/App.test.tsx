import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from './utils/test-utils';
import App from '../src/App';

describe('Verificação de teste', () => {
  it('Componente App contém "Dog Breed"', () => {
    render(<App />);
    expect(screen.getByText('Dog Breed')).toBeInTheDocument();
  });
});
