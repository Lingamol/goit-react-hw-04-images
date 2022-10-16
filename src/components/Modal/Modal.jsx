import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalImg, Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ activeGalleryItem, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const { largeImageURL, tags } = activeGalleryItem;

  return createPortal(
    <Overlay className="overlay" onClick={handleOverlayClick}>
      <ModalContent className="modal">
        <ModalImg src={largeImageURL} alt={tags} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
Modal.propTypes = {
  activeGalleryItem: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
