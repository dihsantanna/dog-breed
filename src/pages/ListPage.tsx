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

const DOG_BREED_LOGO_URL = `https://drive.google.com/u/1/uc?id=
1OmrmWRaRmKmw_YlGblI6_lXXXATdUtpk&export=download`;
const DOG_BREED_PAW_URL = `https://drive.google.com/u/1/uc?id=
1WpXXsAS_WrQXUxVO-E_3u0OiwpTYffWW&export=download`;

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/register', { replace: true });
  };

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
            src={DOG_BREED_LOGO_URL}
            alt="logo dog breed"
            className="listPage-logo"
          />
          <button
            className="logout-btn"
            type="button"
            onClick={handleLogout}
          >logout</button>
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
                      src={DOG_BREED_PAW_URL}
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
