import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_IMG_TESTID } from '../../test/utils/testIds';
import { DogCardView } from '../components/DogCardView';
import { Loading } from '../components/Loading';
import { requestData, setToken } from '../services/request';
import { IDogBreed } from '../types/IDogBreed';
import { IError } from '../types/IErrorApi';
import './listPage.css';

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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, selectedBreed]);

  useEffect(() => {
    requestBreedImages();
  }, [requestBreedImages]);

  return (
    <>
    <div
      className="list-page"
    >
        <header>
          <img
            data-testid={LOGO_IMG_TESTID}
            src="src/assets/dog_breed_logo.svg"
            alt="logo dog breed"
            className="listPage-logo"
          />
        </header>
        <div
          className="filter-breeds"
        >
          {breeds.map((breed) => (
            <button
            key={`${breed}-button`}
            type="button"
            onClick={() => setSelectedBreed(breed.toLowerCase())}
            disabled={selectedBreed === breed.toLowerCase()}
            >
              {
                selectedBreed === breed.toLowerCase()
                  ? <img
                      src="src/assets/dog_breed.svg"
                      className='btn-logo'
                      alt='pata do logo da Dog Breed'
                    />
                  : null
              }
              {breed}
            </button>
          ))}
        </div>
        <div
          className="msg-list-page"
        >
          {errorMessage}
        </div>
        <section
          className="image-list"
        >
          {isLoading
            ? <Loading />
            : breedImages.map((breedImg, index) => (
              <DogCardView
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
