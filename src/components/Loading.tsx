import DOG_BREED_PAW_URL from '../assets/dog_paw.svg';
import './loading.css';

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
