import React from 'react';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';

import { ListPage } from '../../src/pages/ListPage';
import { DOG_IMG, LOGO_IMG } from '../utils/testIds';
import { requestData } from '../../src/services/request';
import { mockRequestData } from '../mocks/requestMock';
import { breeds } from '../mocks/breeds';

describe.skip('Testando componente ListPage', () => {
  beforeEach(() => {
    render(<ListPage />);
  });

  it(`Componente deve ter uma imagem com data-testid "${LOGO_IMG}"`, () => {
    const logoImage = screen.getByTestId(LOGO_IMG);
    expect(logoImage).toBeInTheDocument();
  });

  it(`Componente deve possuir quatro botões para requisição das imagens
  por raça dos cachorros, um botão por cada raça de cachorro,
  as raças disponíveis são: Chihuahua, Husky, Labrador e Pug`, () => {
    const races = ['Chihuahua', 'Husky', 'Labrador', 'Pug'];

    const racesButtons = races.map((race) => screen.getByText(race));

    racesButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it(`Componente deve se capaz de renderizar uma grade de imagens de cachorros,
  onde cada imagem deve ter o data-testid ${DOG_IMG}<breed>-<index>`, () => {
    vi.mock('../../src/services/request', () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const requestData = vi.fn();
      return { requestData };
    });

    (requestData as unknown as MockedFunction<typeof requestData>)
      .mockImplementation(mockRequestData);

    const raceImages = breeds.chihuahua.list
      .map((_image, index) => screen
        .getByTestId(DOG_IMG + breeds.chihuahua.breed + index));

    raceImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });
});
