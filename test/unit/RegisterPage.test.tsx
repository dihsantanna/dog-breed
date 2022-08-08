import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { EMAIL_INPUT_TESTID, LOGIN_BUTTON_TESTID, LOGO_IMG_TESTID } from '../utils/testIds';
import { RegisterPage } from '../../src/pages/RegisterPage';

describe('Testando componente RegisterPage', () => {
  beforeEach(() => {
    render(<RegisterPage />);
  });

  it(`Componente deve ter uma imagem com data-testid "${LOGO_IMG_TESTID}"`, () => {
    const logoImage = screen.getByTestId(LOGO_IMG_TESTID);
    expect(logoImage).toBeInTheDocument();
  });

  it(`Componente deve ter um input tipo "email" com placeholder "Digite seu email aqui"
  e data-testid "${EMAIL_INPUT_TESTID}"`, () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Digite seu email aqui');
  });
  it(`Componente deve ter um botão do tipo "submit" com nome "Entrar"
  e data-testid "${LOGIN_BUTTON_TESTID}"`, () => {
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('type', 'submit');
    expect(loginButton).toHaveTextContent('Entrar');
  });
});
