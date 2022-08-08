import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_IMG_TESTID } from '../../test/utils/testIds';
import { DogCard } from '../components/DogCard';
import { requestData, setToken } from '../services/request';
import { IDogBreed } from '../types/IDogBreed';
import { IError } from '../types/IErrorApi';

const breeds = ['Chihuahua', 'Husky', 'Labrador', 'Pug'];

export function ListPage() {
  const [breedImages, setBreedImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('chihuahua');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const requestBreedImages = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const token = localStorage.getItem('token');

      if (!token || jwtDecode<InvalidTokenError>(token).message) {
        navigate('../register', { replace: true });
        return;
      }

      setToken(token as string);
      const { data, status } = await requestData(`/list?breed=${selectedBreed}`);

      if (status !== 200) {
        setErrorMessage((data as IError).error.message);
        return;
      }

      setBreedImages((data as IDogBreed).list);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, selectedBreed]);

  useEffect(() => {
    requestBreedImages();
  }, [requestBreedImages]);

  return (
    <>
    <div>
        <header>
          <img
            data-testid={LOGO_IMG_TESTID}
            src='src/assets/dog_breed_logo.svg'
            alt="logo dog breed"
            className='listPage-logo'
          />
        </header>
        <div>
          {breeds.map((breed) => (
            <button
            key={`${breed}-button`}
            type="button"
            onClick={() => setSelectedBreed(breed.toLowerCase())}
            >{breed}</button>
          ))}
        </div>
        <span>{errorMessage}</span>
        <section>
          {isLoading
            ? <span>Loading</span>
            : breedImages.map((breedImg, index) => (
              <DogCard
                key={`${selectedBreed}-image-${index}`}
                src={breedImg}
                index={index}
                breed={selectedBreed}
              />
            ))
          }
        </section>
    </div>
    </>
  );
}
