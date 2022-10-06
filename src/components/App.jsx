import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Searchbar from './Searchbar';
import { Component } from 'react';
import { AppWrapper } from './App.styled';
// import { hits } from '../js/data';
import api from 'services/api';

export class App extends Component {
  state = {
    // showModal: false,
    isLoading: false,
    error: null,
    galleryColection: [],
    activeGalleryItem: null,
    search: null,
  };
  componentDidMount() {
    // console.log('App Mount');
  }

  componentWillUnmount() {
    // console.log('App WillUnmount');
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('App componentDidUpdate');
    if (prevState.search !== this.state.search) {
      console.log('prevState.search', prevState.search);
      console.log('this.state.search', this.state.search);
      this.setState({ isLoading: true });

      try {
        const images = await api(this.state.search);
        // const { hits } = data;
        // img = images;
        if (images.length === 0) {
          toast.warning(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          return;
        }
        this.setState({ galleryColection: images });

        // this.setState({ galleryColection: [...images] });
      } catch (error) {
        this.setState({ error });
        toast.error('Sorry, something going wrong :(', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        this.setState({ isLoading: false });
      }
      // const data = api.fetchImagesWithQuery(this.state.search);
    }
  }

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
  };

  render() {
    const { activeGalleryItem, isLoading } = this.state;
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
        {isLoading && <Loader />}
        <Button onLoadMore={this.toggleModal} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppWrapper>
    );
  }
}
