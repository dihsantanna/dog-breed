import { AuthError } from '@supabase/supabase-js';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EMAIL_INPUT_TESTID,
  LOGIN_BUTTON_TESTID,
  LOGO_IMG_TESTID
} from '../../test/utils/testIds';
import DOG_BREED_LOGO_URL from '../assets/dog_breed_logo.svg';
import { requestLogin } from '../services/request';
import { supabase } from '../services/supabase';
import './registerPage.css';

export function RegisterPage() {
  const [inputLogin, setInputLogin] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const validateLogin = () => {
    if (!inputLogin) {
      setLoginError('Campo obrigatório');
      return false;
    }

    const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/gi;

    if (!re.test(inputLogin)) {
      setLoginError('Email inválido');
      return false;
    }
    setLoginError('');
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!validateLogin()) {
        return;
      }

      await requestLogin(inputLogin);

      navigate('../list', { replace: true });
    } catch (error) {
      setLoginError((error as AuthError).message);
    }
  };

  const isLogged = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate('/list', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    isLogged();
  }, [isLogged]);

  return (
     <div className="register-page">
      <img
        data-testid={LOGO_IMG_TESTID}
        src={DOG_BREED_LOGO_URL}
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
