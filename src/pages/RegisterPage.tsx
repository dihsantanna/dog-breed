import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { EMAIL_INPUT, LOGIN_BUTTON, LOGO_IMG } from '../../test/utils/testIds';
import { requestLogin } from '../services/request';
import { IError } from '../types/IErrorApi';
import { IUser } from '../types/IUser';

export function RegisterPage() {
  const [inputLogin, setInputLogin] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, status } = await requestLogin('/register', { email: inputLogin });
    if (status !== 200) {
      setLoginError((data as IError).error.message);
      return;
    }
    const { user: { token } } = data as IUser;
    localStorage.setItem('token', token);
    navigate('../list', { replace: true });
  };

  const isLogged = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token && !jwtDecode<InvalidTokenError>(token).message) {
      console.log('entreiaki');
      navigate('../list', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    isLogged();
  }, [isLogged]);

  return (
     <>
      <img
        data-testid={LOGO_IMG}
        src='src/assets/dog_breed_logo.svg'
        alt="logo dog breed"
      />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            data-testid={EMAIL_INPUT}
            type="email"
            placeholder="Digite seu email aqui"
            value={inputLogin}
            onChange={({ target }) => setInputLogin(target.value)}
          />
          {loginError ? <span>{loginError}</span> : null}
        </label>
        <button
          data-testid={LOGIN_BUTTON}
          type="submit"
          title="Entrar"
          >
            Entrar
          </button>
      </form>
    </>
  );
}
