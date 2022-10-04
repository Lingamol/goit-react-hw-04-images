import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalImg, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  onOpenModal = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onOpenModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onOpenModal);
    console.log('modal Unmount');
  }

  render() {
    return createPortal(
      <Overlay className="overlay">
        <Modal className="modal">
          <ModalImg src="" alt="" />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}
export default Modal;
