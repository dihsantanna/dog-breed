import React from 'react';
import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import jwtDecode from 'jwt-decode';
import { render, screen } from '../utils/test-utils';

import App from '../../src/App';
import { loginError, loginSuccess } from '../mocks/requestMock';
import {
  EMAIL_INPUT_TESTID, LOGIN_BUTTON_TESTID,
} from '../utils/testIds';
import { requestLogin } from '../../src/services/request';

describe('Testando rota "/register"', () => {
  beforeEach(() => {
    vi.mock('../../src/services/request', () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const requestLogin = vi.fn();
      return { requestLogin };
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('Ao acessar rota "/" é redirecionado para rota "/register', () => {
    const { history } = render(<App />);
    const { pathname } = history.location();
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);
    expect(pathname).toBe('/register');
    expect(loginButton).toBeInTheDocument();
  });

  it(`Ao digitar email válido no campo de registro e clicar no botão "Entrar"
  é redirecionado para a rota "/list"`, async () => {
    (requestLogin as unknown as MockedFunction<typeof requestLogin>)
      .mockResolvedValue(loginSuccess);

    const { user, history } = render(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    await user.click(emailInput);
    await user.paste('usuario@email.com');

    await user.click(loginButton);

    const { pathname } = history.location();

    expect(pathname).toBe('/list');
  });

  it(`Se o usuário já estiver logado, ao acessar a rota "/register",
  deve ser redirecionado para rota "/list"`, () => {
    vi.mock('jwt-decode');

    (jwtDecode as unknown as MockedFunction<typeof jwtDecode>)
      .mockReturnValue({});

    window.localStorage.setItem('token', 'token');

    const { history } = render(<App />, { route: '/register' });

    const { pathname } = history.location();

    expect(pathname).toBe('/list');
  });

  it(`Caso usuário tente logar com email invalido deve-se imprimir a mensagem
  "Email is not valid"`, async () => {
    (requestLogin as unknown as MockedFunction<typeof requestLogin>)
      .mockResolvedValue(loginError);

    const { user } = render(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    await user.click(emailInput);
    await user.paste('email@invalido');

    await user.click(loginButton);

    const emailInvalidMsg = await screen.findByText('Email is not valid');

    expect(emailInvalidMsg).toBeInTheDocument();
  });
});
