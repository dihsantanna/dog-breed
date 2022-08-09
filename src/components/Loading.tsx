import React from 'react';
import './loading.css';

export function Loading() {
  return (
    <div
      className='loading-container'
    >
      <img
        src="src/assets/dog_breed.svg"
        className='load-logo'
        alt='pata do logo da Dog Breed'
      />
    </div>
  );
}
