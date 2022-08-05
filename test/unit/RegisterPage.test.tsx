import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { EMAIL_INPUT, LOGIN_BUTTON, LOGO_IMG } from '../utils/testIds';
import { RegisterPage } from '../../src/pages/RegisterPage';

describe('Testando componente RegisterPage', () => {
  beforeEach(() => {
    render(<RegisterPage />);
  });

  it(`Componente deve ter uma imagem com data-testid "${LOGO_IMG}"`, () => {
    const logoImage = screen.getByTestId(LOGO_IMG);
    expect(logoImage).toBeInTheDocument();
  });

  it(`Componente deve ter um input tipo "email" com placeholder "Digite seu email aqui"
  e data-testid "${EMAIL_INPUT}"`, () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Digite seu email aqui');
  });
  it(`Componente deve ter um botão do tipo "submit" com nome "Entrar"
  e data-testid "${LOGIN_BUTTON}"`, () => {
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('type', 'submit');
    expect(loginButton).toHaveTextContent('Entrar');
  });
});
