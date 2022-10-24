import { useState } from 'react';
import { DOG_IMG_TESTID } from '../../test/utils/testIds';
import './dogCardView.css';

interface DogCardViewProps {
  breed: string;
  src: string;
  index: number;
}

export function DogCardView({ breed, src, index }: DogCardViewProps) {
  const [show, setShow] = useState(false);
  const handleVisibility = () => setShow((lastState) => !lastState);
  return (
    <>
      <div
        className={`view-board ${show && 'show-view'}`}
      >
        <button
          className='btn-close-view'
          type='button'
          onClick={handleVisibility}
        >
          <i className="bi bi-x"></i>
        </button>
        <div
          className='image-container'
        >
          <img
            className='dog-image-view'
            src={src}
            alt={`Imagem de um ${breed} ${index} expandida`}
          />
        </div>
      </div>
      <div
        className='card-image'
      >
        <img
          className='dog-image-sm'
          data-testid={`${DOG_IMG_TESTID}${breed}-${index}`}
          src={src}
          alt={`Imagem de uma ${breed} ${index}`}
          onClick={handleVisibility}
        />
      </div>
    </>
  );
}
