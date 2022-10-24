import { AuthError } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_IMG_TESTID } from '../../test/utils/testIds';
import DOG_BREED_LOGO_URL from '../assets/dog_breed_logo.svg';
import DOG_BREED_PAW_URL from '../assets/dog_paw.svg';
import { DogCardView } from '../components/DogCardView';
import { Loading } from '../components/Loading';
import { requestData } from '../services/request';
import { supabase } from '../services/supabase';
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
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate('/register', { replace: true });
        return;
      }

      const { data, status } = await requestData(selectedBreed);

      if (status !== 200) {
        setErrorMessage((data as IError).error.message);
        return;
      }

      setBreedImages((data as IDogBreed).message);
    } catch (error) {
      setErrorMessage((error as AuthError).message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, selectedBreed]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
