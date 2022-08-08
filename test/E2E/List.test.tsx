import React from 'react';
import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import jwtDecode from 'jwt-decode';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../utils/test-utils';

import App from '../../src/App';
import { loginSuccess, mockRequestData } from '../mocks/requestMock';
import {
  EMAIL_INPUT_TESTID, LOGIN_BUTTON_TESTID, DOG_IMG_TESTID,
} from '../utils/testIds';
import { requestLogin, requestData } from '../../src/services/request';
import { breeds } from '../mocks/breeds';

describe.skip('testando rota "/list"', () => {
  beforeEach(async () => {
    vi.mock('../../src/services/request', () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const requestLogin = vi.fn();
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const requestData = vi.fn();
      return { requestLogin, requestData };
    });
    vi.mock('jwt-decode');

    (requestLogin as unknown as MockedFunction<typeof requestLogin>)
      .mockResolvedValue(loginSuccess);
    (requestData as unknown as MockedFunction<typeof requestData>)
      .mockImplementation(mockRequestData);

    (jwtDecode as unknown as MockedFunction<typeof jwtDecode>)
      .mockReturnValue({});

    const { user } = render(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);

    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    await user.click(emailInput);
    await user.paste('usuario@email.com');

    await user.click(loginButton);
  });

  afterEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it(`Ao carregar a pagina por padrão deve-se renderizar as imagens
  da raça chihuahua`, () => {
    const raceImages = breeds.chihuahua.list
      .map((_image, index) => screen
        .getByTestId(DOG_IMG_TESTID + breeds.chihuahua.breed + index));

    raceImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });

  it('Ao clicar no botão "Husky" são renderizas as imagens da respectiva raça', () => {
    const huskyButton = screen.getByText('Husky');
    userEvent.click(huskyButton);

    const raceImages = breeds.husky.list
      .map((_image, index) => screen
        .getByTestId(DOG_IMG_TESTID + breeds.husky.breed + index));

    raceImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });

  it('Ao clicar no botão "Labrador" são renderizas as imagens da respectiva raça', () => {
    const labradorButton = screen.getByText('Labrador');
    userEvent.click(labradorButton);

    const raceImages = breeds.labrador.list
      .map((_image, index) => screen
        .getByTestId(DOG_IMG_TESTID + breeds.labrador.breed + index));

    raceImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });

  it('Ao clicar no botão "Pug" são renderizas as imagens da respectiva raça', () => {
    const pugButton = screen.getByText('Pug');
    userEvent.click(pugButton);

    const raceImages = breeds.pug.list
      .map((_image, index) => screen
        .getByTestId(DOG_IMG_TESTID + breeds.pug.breed + index));

    raceImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });

  it(
    'Ao clicar no botão "Chihuahua" são renderizas as imagens da respectiva raça',
    () => {
      const pugButton = screen.getByText('Pug');
      userEvent.click(pugButton);

      const raceImage = screen.getByTestId(DOG_IMG_TESTID + breeds.pug.breed + 0);

      expect(raceImage).toBeInTheDocument();

      const chihuahuaButton = screen.getByText('Chihuahua');
      userEvent.click(chihuahuaButton);

      const raceImages = breeds.chihuahua.list
        .map((_image, index) => screen
          .getByTestId(DOG_IMG_TESTID + breeds.chihuahua.breed + index));

      raceImages.forEach((image) => {
        expect(image).toBeInTheDocument();
      });
    },
  );
});
