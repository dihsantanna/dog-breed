import React from 'react';
import './loading.css';

const DOG_BREED_PAW_URL = `https://drive.google.com/u/1/uc?id=
1WpXXsAS_WrQXUxVO-E_3u0OiwpTYffWW&export=download`;

export function Loading() {
  return (
    <div
      className='loading-container'
    >
      <img
        src={DOG_BREED_PAW_URL}
        className='load-logo'
        alt='pata do logo da Dog Breed'
      />
    </div>
  );
}
