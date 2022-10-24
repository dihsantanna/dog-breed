import { IDogBreed } from '../../src/types/IDogBreed';
import { breeds, BreedType } from './breeds';

const ID = '1ebade15-9e5d-441a-b52a-ff6fe24681be';

export const loginSuccess = {
  id: ID,
  aud: 'authenticated',
  role: 'authenticated',
  email: 'email@email.com',
  email_confirmed_at: '2022-10-24T04:33:19.549135Z',
  phone: '',
  confirmed_at: '2022-10-24T04:33:19.549135Z',
  last_sign_in_at: '2022-10-24T05:32:32.246337019Z',
  app_metadata: {
    provider: 'email',
    providers: [
      'email'
    ]
  },
  user_metadata: {},
  identities: [
    {
      id: ID,
      user_id: ID,
      identity_data: {
        sub: ID
      },
      provider: 'email',
      last_sign_in_at: '2022-10-24T04:33:19.547133Z',
      created_at: '2022-10-24T04:33:19.547178Z',
      updated_at: '2022-10-24T04:33:19.547182Z'
    }
  ],
  created_at: '2022-10-24T04:33:19.532963Z',
  updated_at: '2022-10-24T05:32:32.248072Z'
};

export const mockRequestData = async (endpoint: string) => ({
  status: 200,
  data: breeds[endpoint as BreedType || 'chihuahua'] as unknown as IDogBreed,
});
