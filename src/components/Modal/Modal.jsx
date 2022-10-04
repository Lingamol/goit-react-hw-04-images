import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalImg, Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  onOpenModal = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onOpenModal);
    console.log('modal Mount');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onOpenModal);
    console.log('modal Unmount');
  }

  render() {
    return createPortal(
      <Overlay className="overlay">
        <ModalContent className="modal">
          {/* <ModalImg src="" alt="" /> */}
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
