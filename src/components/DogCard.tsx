import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DOG_IMG_TESTID } from '../../test/utils/testIds';

interface DogCardProps {
  breed: string;
  src: string;
  index: number;
}

export function DogCard({ breed, src, index }: DogCardProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img
        data-testid={`${DOG_IMG_TESTID}${breed}-${index}`}
        src={src}
        alt={`Imagem de uma ${breed} ${index}`}
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <img
        src={src}
        alt={`Imagem de uma ${breed} ${index} expandido`}
      />
        </Modal.Body>
      </Modal>
    </>
  );
}
