import { breeds, BreedType } from './breeds';

export const loginError = {
  status: 401,
  data: {
    error: {
      message: 'error message',
    },
  },
};

export const loginSuccess = {
  status: 200,
  data: {
    user: {
      email: 'usuario@email.com',
      _id: '62ed2e49cdd60627de2c4704',
      token: 'JWT token',
    },
  },
};

const regexp = /https:\/\/dogbreed-api\.q9\.com\.br\/list(\?breed=)?/g;

export const mockRequestData = async (endpoint: string) => ({
  status: 200,
  data: breeds[endpoint.replace(regexp, '') as BreedType || 'chihuahua'],
});
