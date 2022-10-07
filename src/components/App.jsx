import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import SearchBar from './Searchbar';
import { Component } from 'react';
import { AppWrapper } from './App.styled';
// import { hits } from '../js/data';
import { fetchImagesWithQuery, PER_PAGE } from 'services/api';

export class App extends Component {
  state = {
    // showModal: false,
    isLoading: false,
    error: null,
    galleryColection: null,
    activeGalleryItem: null,
    search: null,
    page: null,
    totalHits: null,
  };
  componentDidMount() {
    console.log('App Mount');
  }

  componentWillUnmount() {
    // console.log('App WillUnmount');
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('App componentDidUpdate');
    // if (prevState.search !== this.state.search) {
    //   this.setState({ page: 1 });
    //   // console.log('prevState.search', prevState.search);
    //   // console.log('this.state.search', this.state.search);
    //
    // }
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      if (prevState.search !== this.state.search) {
        this.setState({ page: 1 });
      }
      this.setState({ isLoading: true, galleryColection: null });
      try {
        const data = await fetchImagesWithQuery(
          this.state.search,
          this.state.page
        );
        const { hits, totalHits } = data;
        // img = images;
        if (hits.length === 0) {
          if (this.state.page) {
            this.setState({
              totalHits: null,
              page: null,
              galleryColection: [],
            });
          }
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
        } else {
          this.setState({
            galleryColection: hits,
            totalHits,
          });
        }

        // this.setState({ galleryColection: [...images] });
      } catch (error) {
        this.setState({
          error,
          totalHits: null,
          page: null,
          galleryColection: null,
        });
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
    // console.log(search);
    const normalizedSearch = search.toLocaleLowerCase();
    if (normalizedSearch && normalizedSearch !== this.state.search) {
      this.setState({ search: normalizedSearch });
    }
  };
  OnClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  onDisableLoadMore = () => {
    const { totalHits, page } = this.state;
    if (!totalHits) {
      return true;
    } else if (totalHits - PER_PAGE * page < 0) {
      return true;
    } else {
      return false;
    }
  };

  showBtnLoadMore = () => {
    const { totalHits } = this.state;
    if (totalHits / PER_PAGE > 1) {
      return true;
    } else {
      return false;
    }
  };
  // showGallery = () => {
  //   const { totalHits } = this.state;
  //   if (totalHits) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  render() {
    const { activeGalleryItem, isLoading, galleryColection } = this.state;
    // console.log(this.state.gellaryColection);
    const showBtnLoadMore = this.showBtnLoadMore();
    // const showGallery = this.showGallery();
    return (
      <AppWrapper>
        <SearchBar onSubmit={this.heandleSubmitForm} />
        {galleryColection && (
          <ImageGallery
            galleryColection={this.state.galleryColection}
            onSelectGalleryItem={item => {
              this.onSelectGalleryItem(item);
            }}
          />
        )}

        {activeGalleryItem && (
          <Modal
            onClose={this.toggleModal}
            activeGalleryItem={this.state.activeGalleryItem}
          />
        )}
        {isLoading && <Loader />}
        {showBtnLoadMore && (
          <Button
            onLoadMore={this.OnClickLoadMore}
            onDisableLoadMore={this.onDisableLoadMore}
          />
        )}
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
