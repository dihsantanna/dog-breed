import React from 'react';
import './notFoundPage.css';

const DOG_BREED_NOT_FOUND_URL = `https://drive.google.com/u/1/uc?id=
1yclVACr7f6wDSmUOlYFhDU1qKZPg8w3g&export=download`;

export function NotFoundPage() {
  return (
    <div
      className="not-found-page"
    >
      <div
        className="not-found-container"
      >
        <img
          className="not-found-img"
          src={DOG_BREED_NOT_FOUND_URL}
          alt="imagem de um husky triste"
        />
        Pagina não Encontrada!
      </div>
    </div>
  );
}
