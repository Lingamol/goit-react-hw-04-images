import axios from 'axios';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Searchbar from './Searchbar';
import { Component } from 'react';
import { AppWrapper } from './App.styled';
import { hits } from '../js/data';
// import api from '../services/api';
axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    // showModal: false,
    isLoading: false,
    error: null,
    galleryColection: [...hits],
    activeGalleryItem: null,
    search: null,
  };

  toggleModal = () => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    this.setState(({ activeGalleryItem }) => ({
      activeGalleryItem: null,
    }));
  };

  onSelectGalleryItem = item => {
    this.setState({ activeGalleryItem: item });
  };

  heandleSubmitForm = ({ search }) => {
    console.log(search);
    const normalizedSearch = search.toLocaleLowerCase();
    if (normalizedSearch && normalizedSearch !== this.state.search) {
      this.setState({ search: normalizedSearch });
    }

    // else {
    //   const newId = nanoid();
    //   const newContact = { id: newId, ...data };
    //   console.log(data);
    //   this.setState(prevState => ({
    //     contacts: [newContact, ...prevState.contacts],
    //   }));
    // }
  };

  render() {
    const { activeGalleryItem } = this.state;
    // console.log(this.state.gellaryColection);
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.heandleSubmitForm} />
        <ImageGallery
          galleryColection={this.state.galleryColection}
          onSelectGalleryItem={item => {
            this.onSelectGalleryItem(item);
          }}
        />

        {/* <Modal /> */}
        {activeGalleryItem && (
          <Modal
            onClose={this.toggleModal}
            activeGalleryItem={this.state.activeGalleryItem}
          />
        )}
        <Loader />
        <Button onLoadMore={this.toggleModal} />
      </AppWrapper>
    );
  }
}
