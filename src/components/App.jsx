// import { ToastContainer, toast } from 'react-toastify';

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
import GalleryPagination from 'GalleryPagination';

export class App extends Component {
  state = {
    // showModal: false,
    isLoading: true,
    error: null,
    galleryColection: [],
    activeGalleryItem: null,
    search: '',
    page: 1,
    totalHits: 0,
    pagination: true,
  };
  componentDidMount() {
    console.log('App Mount');
  }

  componentWillUnmount() {
    // console.log('App WillUnmount');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('App componentDidUpdate');
    const { page, search } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.FetchImg();
    }

    // if (prevState.search !== search && prevState.page !== 1) {
    //   this.setState({ page: 1, galleryColection: [] });
    //   this.FetchImg();
    //   console.log(
    //     'App componentDidUpdate prevState.search !== search && prevState.page !== 1'
    //   );
    //   return;
    // } else if (prevState.search !== search && prevState.page === 1) {
    //   this.setState({ galleryColection: [] });
    //   this.FetchImg();
    //   console.log(
    //     'App componentDidUpdate prevState.search !== search && prevState.page === 1'
    //   );
    //   return;
    // } else if (prevState.search === search && prevState.page !== page) {
    //   this.FetchImg();
    //   console.log('prevState.search === search && prevState.page !== page');
    // }
  }

  FetchImg = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await fetchImagesWithQuery(
        this.state.search,
        this.state.page
      );
      const { hits, totalHits } = data;
      if (this.state.page === 1 || this.state.pagination) {
        this.setState({
          galleryColection: [...hits],
          totalHits,
        });
      } else if (!this.state.pagination) {
        this.setState(state => ({
          galleryColection: [...state.galleryColection, ...hits],
          totalHits,
        }));
      }
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({ isLoading: false });
    }
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
    // console.log(search);
    const normalizedSearch = search.toLocaleLowerCase();
    if (normalizedSearch && normalizedSearch !== this.state.search) {
      this.setState({
        search: normalizedSearch,
        page: 1,
        galleryColection: [],
      });
    }
  };
  OnClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  OnPagination = page => {
    // console.log(page);
    this.setState({ page });
  };
  // countPages = () => {
  //   const { totalHits } = this.state;
  //   if (totalHits > PER_PAGE) return Math.ceil(totalHits / PER_PAGE);
  //   else {
  //     return 1;
  //   }
  // };
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
  showGallery = () => {
    const { totalHits } = this.state;
    if (totalHits) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { activeGalleryItem, isLoading, totalHits } = this.state;
    // console.log(this.state.gellaryColection);
    const showBtnLoadMore = this.showBtnLoadMore();
    const showGallery = this.showGallery();
    const countPages = Math.ceil(totalHits / PER_PAGE);
    return (
      <AppWrapper>
        <SearchBar onSubmit={this.heandleSubmitForm} />
        {showGallery && (
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
        <GalleryPagination
          onPagination={this.OnClickLoadMore}
          countPages={countPages}
          // pageNumber={this.state.page}
        />
        {/* <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      </AppWrapper>
    );
  }
}
