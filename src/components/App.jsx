import Button from './Button';
import ImageGallery from './ImageGallery';
import GallaryItem from './ImageGalleryItem';
import Loader from './Loader';
import Modal from './Modal';
import Searchbar from './Searchbar';
import { Component } from 'react';
import { AppWrapper } from './App.styled';
const onSearch = () => {};
export class App extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <AppWrapper>
        <Searchbar onSearch={onSearch} />
        <ImageGallery />
        <GallaryItem />
        {showModal && <Modal onClose={this.toggleModal} />}
        <Loader />
        <Button />
      </AppWrapper>
    );
  }
}
