/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import { Session } from '@supabase/supabase-js';
import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { supabase } from '../../src/services/supabase';
import { render, screen, waitFor, waitForElementToBeRemoved } from '../utils/test-utils';

import App from '../../src/App';
import { requestData, requestLogin } from '../../src/services/request';
import { loginSuccess, mockRequestData } from '../mocks/requestMock';
import {
  EMAIL_INPUT_TESTID, LOGIN_BUTTON_TESTID
} from '../utils/testIds';

const mockGetSession = (bool: boolean) => {
  supabase.auth.getSession = vi.fn(() => (
    Promise.resolve({
      data: {
        session: bool as unknown as Session
      },
      error: null
    })
  ));
};

describe('Testando rota "/register"', () => {
  beforeEach(() => {
    vi.mock('../../src/services/request', () => {
      const requestLogin = vi.fn();
      const requestData = vi.fn();
      return { requestLogin, requestData };
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('Ao acessar rota "/" é redirecionado para rota "/register', () => {
    const { history, unmount } = render(<App />);
    const { pathname } = history.location();
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);
    expect(pathname).toBe('/register');
    expect(loginButton).toBeInTheDocument();
    unmount();
  });

  it(`Ao digitar email válido no campo de registro e clicar no botão "Entrar"
  é redirecionado para a rota "/list"`, async () => {
    (requestLogin as unknown as MockedFunction<typeof requestLogin>)
      .mockResolvedValue(loginSuccess);

    (requestData as unknown as MockedFunction<typeof requestData>)
      .mockImplementation(mockRequestData);

    mockGetSession(true);
    const { user, history, unmount } = render(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    await user.click(emailInput);
    await user.paste('email@email.com');

    await user.click(loginButton);

    const { pathname } = history.location();

    expect(pathname).toBe('/list');
    unmount();
  });

  it(`Se o usuário já estiver logado, ao acessar a rota "/register",
  deve ser redirecionado para rota "/list"`, async () => {
    (requestData as unknown as MockedFunction<typeof requestData>)
      .mockImplementation(mockRequestData);

    mockGetSession(true);

    const { history, unmount } = render(<App />, { route: '/register' });

    await waitForElementToBeRemoved(() => screen.getByTestId(LOGIN_BUTTON_TESTID));

    const { pathname } = history.location();

    expect(pathname).toBe('/list');
    unmount();
  });

  it(`Caso usuário tente logar com email invalido deve-se imprimir a mensagem
  "Email inválido"`, async () => {
    mockGetSession(false);
    const { user, unmount } = render(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    await user.click(emailInput);
    await user.paste('email@invalido');

    await user.click(loginButton);

    const emailInvalidMsg = await waitFor(() => screen.getByText('Email inválido'));

    expect(emailInvalidMsg).toBeInTheDocument();
    unmount();
  });
});
