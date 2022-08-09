import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  EMAIL_INPUT_TESTID,
  LOGIN_BUTTON_TESTID,
  LOGO_IMG_TESTID } from '../../test/utils/testIds';
import { requestLogin } from '../services/request';
import { IError } from '../types/IErrorApi';
import { IUser } from '../types/IUser';
import './registerPage.css';

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
      navigate('../list', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    isLogged();
  }, [isLogged]);

  return (
     <div className="register-page">
      <img
        data-testid={LOGO_IMG_TESTID}
        src='src/assets/dog_breed_logo.svg'
        alt="logo dog breed"
        className='register-logo'
      />
      <form onSubmit={handleSubmit}>
        <label>
          Login:
          <input
            data-testid={EMAIL_INPUT_TESTID}
            type="email"
            placeholder="Digite seu email aqui"
            value={inputLogin}
            onChange={({ target }) => setInputLogin(target.value)}
            required
          />
          <span>{loginError || null}</span>
        </label>
        <button
          data-testid={LOGIN_BUTTON_TESTID}
          type="submit"
          title="Entrar"
          >
            Entrar
          </button>
      </form>
    </div>
  );
}
