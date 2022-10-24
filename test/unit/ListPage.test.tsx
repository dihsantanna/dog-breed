/* eslint-disable @typescript-eslint/no-shadow */
import { Session } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';

import { ListPage } from '../../src/pages/ListPage';
import { requestData } from '../../src/services/request';
import { supabase } from '../../src/services/supabase';
import { breeds } from '../mocks/breeds';
import { mockRequestData } from '../mocks/requestMock';
import { DOG_IMG_TESTID, LOGO_IMG_TESTID } from '../utils/testIds';

let unmountFuc: VoidFunction;

describe('Testando componente ListPage', () => {
  beforeEach(() => {
    vi.mock('../../src/services/request', () => {
      const requestData = vi.fn();
      return { requestData };
    });
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

    const { unmount } = render(<ListPage />);
    unmountFuc = unmount;
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
    unmountFuc();
  });

  it(`Componente deve ter uma imagem com data-testid "${LOGO_IMG_TESTID}"`, () => {
    const logoImage = screen.getByTestId(LOGO_IMG_TESTID);

    expect(logoImage).toBeInTheDocument();
  });

  it(`Componente deve possuir quatro botões para requisição das imagens
  por raça dos cachorros, um botão por cada raça de cachorro,
  as raças disponíveis são: Chihuahua, Husky, Labrador e Pug`, async () => {
    const races = ['Chihuahua', 'Husky', 'Labrador', 'Pug'];

    const racesButtons = races.map((race) => screen.getByText(race));

    racesButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it(`Componente deve se capaz de renderizar uma grade de imagens de cachorros,
  onde cada imagem deve ter o data-testid ${DOG_IMG_TESTID}<breed>-<index>`, async () => {
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

    raceImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });
});
