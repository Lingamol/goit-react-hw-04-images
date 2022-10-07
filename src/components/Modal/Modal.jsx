import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalImg, Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    // console.log('modal Mount');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    // console.log('modal Unmount');
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.activeGalleryItem;
    // console.log(this.props.activeGalleryItem);
    return createPortal(
      <Overlay className="overlay" onClick={this.handleOverlayClick}>
        <ModalContent className="modal">
          <ModalImg src={largeImageURL} alt={tags} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
  // return (
  //   <Overlay className="overlay">
  //     <ModalContent className="modal">
  //       {/* <ModalImg src="" alt="" /> */}
  //     </ModalContent>
  //   </Overlay>
  // );
}

export default Modal;
Modal.propTypes = {
  activeGalleryItem: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
