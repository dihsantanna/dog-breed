import React from 'react';
import axios from 'axios';
import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '../utils/test-utils';

import App from '../../src/App';
import { loginSuccess, mockRequestData } from '../mocks/requestMock';
import {
  EMAIL_INPUT, LIST_PAGE, LOGIN_BUTTON, REGISTER_PAGE,
} from '../utils/testIds';

describe.skip('Testando rota "/register"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Ao acessar rota "/" é redirecionado para rota "/register', () => {
    const { history } = render(<App />);
    const { pathname } = history.location();
    const registerPage = screen.getByTestId(REGISTER_PAGE);
    expect(pathname).toBe('/register');
    expect(registerPage).toBeInTheDocument();
  });

  it(`Ao digitar email válido no campo de registro e clicar no botão "Entrar"
  é redirecionado para a rota "/list"`, async () => {
    jest.spyOn(axios, 'get')
      .mockResolvedValueOnce(loginSuccess)
      .mockImplementation(mockRequestData);

    const { user } = render(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    await user.click(emailInput);
    await user.paste('usuario@email.com');

    await user.click(loginButton);

    const listPage = screen.getByTestId(LIST_PAGE);

    expect(listPage).toBeInTheDocument();
  });

  it(`Se o usuário já estiver logado, ao acessar a rota "/register",
  deve ser redirecionado para rota "/list"`, async () => {
    jest.spyOn(axios, 'get')
      .mockResolvedValueOnce(loginSuccess)
      .mockImplementation(mockRequestData);

    const { user, history } = render(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    await user.click(emailInput);
    await user.paste('usuario@email.com');

    await user.click(loginButton);

    history.push('/register');

    const { pathname } = history.location();
    const listPage = screen.getByTestId(LIST_PAGE);

    expect(pathname).toBe('/list');
    expect(listPage).toBeInTheDocument();
  });
});
