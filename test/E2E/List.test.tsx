/* eslint-disable @typescript-eslint/no-shadow */
import { Session } from '@supabase/supabase-js';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';

import App from '../../src/App';
import { requestData, requestLogin } from '../../src/services/request';
import { supabase } from '../../src/services/supabase';
import { breeds } from '../mocks/breeds';
import { loginSuccess, mockRequestData } from '../mocks/requestMock';
import {
  DOG_IMG_TESTID, EMAIL_INPUT_TESTID,
  LOGIN_BUTTON_TESTID
} from '../utils/testIds';

let unmountFunc: VoidFunction;

describe('testando rota "/list"', () => {
  beforeEach(async () => {
    vi.mock('../../src/services/request', () => {
      const requestLogin = vi.fn();
      const requestData = vi.fn();
      return { requestLogin, requestData };
    });

    (requestLogin as unknown as MockedFunction<typeof requestLogin>)
      .mockResolvedValue(loginSuccess);
    (requestData as unknown as MockedFunction<typeof requestData>)
      .mockImplementation(mockRequestData);

    supabase.auth.getSession = vi.fn(() => (
      Promise.resolve({
        data: {
          session: true as unknown as Session
        },
        error: null
      })
    ));

    const { user, unmount } = render(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);

    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    await user.click(emailInput);
    await user.paste('usuario@email.com');

    await user.click(loginButton);
    unmountFunc = unmount;
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
    window.localStorage.clear();
    unmountFunc();
  });

  it(`Ao carregar a pagina por padrão deve-se renderizar as imagens
  da raça chihuahua`, async () => {
    const defaultImages = await Promise.all([
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${0}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${1}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${2}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${3}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${4}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${5}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${6}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${7}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${8}`),
      screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${9}`),
    ]);

    defaultImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });

  it(
    'Ao clicar no botão "Husky" são renderizas as imagens da respectiva raça',
    async () => {
      const huskyButton = screen.getByText('Husky');
      userEvent.click(huskyButton);

      const huskyImages = await Promise.all([
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${0}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${1}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${2}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${3}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${4}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${5}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${6}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${7}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${8}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.husky.breed}-${9}`),
      ]);

      huskyImages.forEach((image) => {
        expect(image).toBeInTheDocument();
      });
    },
  );

  it(
    'Ao clicar no botão "Labrador" são renderizas as imagens da respectiva raça',
    async () => {
      const labradorButton = screen.getByText('Labrador');
      userEvent.click(labradorButton);

      const labradorImages = await Promise.all([
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${0}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${1}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${2}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${3}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${4}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${5}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${6}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${7}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${8}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.labrador.breed}-${9}`),
      ]);

      labradorImages.forEach((image) => {
        expect(image).toBeInTheDocument();
      });
    },
  );

  it(
    'Ao clicar no botão "Pug" são renderizas as imagens da respectiva raça',
    async () => {
      const pugButton = screen.getByText('Pug');
      userEvent.click(pugButton);

      const pugImages = await Promise.all([
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${0}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${1}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${2}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${3}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${4}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${5}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${6}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${7}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${8}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${9}`),
      ]);

      pugImages.forEach((image) => {
        expect(image).toBeInTheDocument();
      });
    },
  );

  it(
    'Ao clicar no botão "Chihuahua" são renderizas as imagens da respectiva raça',
    async () => {
      const pugButton = screen.getByText('Pug');
      userEvent.click(pugButton);

      const raceImage = await screen
        .findByTestId(`${DOG_IMG_TESTID + breeds.pug.breed}-${0}`);

      expect(raceImage).toBeInTheDocument();

      const chihuahuaButton = screen.getByText('Chihuahua');
      userEvent.click(chihuahuaButton);

      const chihuahuaImages = await Promise.all([
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${0}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${1}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${2}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${3}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${4}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${5}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${6}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${7}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${8}`),
        screen.findByTestId(`${DOG_IMG_TESTID + breeds.chihuahua.breed}-${9}`),
      ]);

      chihuahuaImages.forEach((image) => {
        expect(image).toBeInTheDocument();
      });
    },
  );
});
