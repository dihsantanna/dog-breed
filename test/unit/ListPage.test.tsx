import React from 'react';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import jwtDecode from 'jwt-decode';
import { render, screen, waitFor } from '../utils/test-utils';

import { ListPage } from '../../src/pages/ListPage';
import { DOG_IMG_TESTID, LOGO_IMG_TESTID } from '../utils/testIds';
import { requestData, setToken } from '../../src/services/request';
import { mockRequestData } from '../mocks/requestMock';
import { breeds } from '../mocks/breeds';

describe('Testando componente ListPage', () => {
  beforeEach(() => {
    vi.mock('../../src/services/request', () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const requestData = vi.fn();
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const setToken = vi.fn();
      return { requestData, setToken };
    });

    vi.mock('jwt-decode');

    window.localStorage.setItem('token', 'token');

    (jwtDecode as unknown as MockedFunction<typeof jwtDecode>)
      .mockReturnValue({});
    (requestData as unknown as MockedFunction<typeof requestData>)
      .mockImplementation(mockRequestData);
    (setToken as unknown as MockedFunction<typeof setToken>)
      .mockResolvedValue();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it(`Componente deve ter uma imagem com data-testid "${LOGO_IMG_TESTID}"`, () => {
    const { unmount } = render(<ListPage />);
    const logoImage = screen.getByTestId(LOGO_IMG_TESTID);

    expect(logoImage).toBeInTheDocument();

    unmount();
  });

  it(`Componente deve possuir quatro botões para requisição das imagens
  por raça dos cachorros, um botão por cada raça de cachorro,
  as raças disponíveis são: Chihuahua, Husky, Labrador e Pug`, async () => {
    const { unmount } = render(<ListPage />);
    const races = ['Chihuahua', 'Husky', 'Labrador', 'Pug'];

    const racesButtons = races.map((race) => screen.getByText(race));

    racesButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    unmount();
  });

  it(`Componente deve se capaz de renderizar uma grade de imagens de cachorros,
  onde cada imagem deve ter o data-testid ${DOG_IMG_TESTID}<breed>-<index>`, async () => {
    const { unmount } = render(<ListPage />);
    const raceImages = await Promise.all([
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

    waitFor(() => {
      raceImages.forEach((image) => {
        expect(image).toBeInTheDocument();
      });
    });
    unmount();
  });
});
