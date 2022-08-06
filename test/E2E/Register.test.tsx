import React from 'react';
import { afterEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import jwtDecode from 'jwt-decode';
import { render, screen } from '../utils/test-utils';

import App from '../../src/App';
import { loginSuccess } from '../mocks/requestMock';
import {
  EMAIL_INPUT, LOGIN_BUTTON,
} from '../utils/testIds';
import { requestLogin } from '../../src/services/request';

describe('Testando rota "/register"', () => {
  afterEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('Ao acessar rota "/" é redirecionado para rota "/register', () => {
    const { history } = render(<App />);
    const { pathname } = history.location();
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    expect(pathname).toBe('/register');
    expect(loginButton).toBeInTheDocument();
  });

  it(`Ao digitar email válido no campo de registro e clicar no botão "Entrar"
  é redirecionado para a rota "/list"`, async () => {
    vi.mock('../../src/services/request', () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const requestLogin = vi.fn();
      return { requestLogin };
    });

    (requestLogin as unknown as MockedFunction<typeof requestLogin>)
      .mockResolvedValue(loginSuccess);

    const { user, history } = render(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

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
});
