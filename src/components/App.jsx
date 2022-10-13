import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import SearchBar from './Searchbar';
import { useState, useEffect } from 'react';
import { AppWrapper } from './App.styled';
// import { hits } from '../js/data';
import { fetchImagesWithQuery, PER_PAGE } from 'services/api';
import GalleryPagination from 'components/GalleryPagination';
// import GallaryContentLoader from 'GallaryContentLoader';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [galleryColection, setGalleryColection] = useState([]);
  const [activeGalleryItem, setActiveGalleryItem] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [pagination, setPagination] = useState('LoadMore');

  //  const componentDidUpdate(prevProps, prevState, snapshot) {
  //     // console.log('App componentDidUpdate');
  //     const { page, search, pagination } = this.state;
  //     if (
  //       prevState.search !== search ||
  //       prevState.page !== page ||
  //       prevState.pagination !== pagination
  //     ) {
  //       this.FetchImg();
  //    }

  //     // if (prevState.pagination !== pagination && search !== '') {
  //     //   this.setState({ galleryColection: [], page: 1 });
  //     //   this.FetchImg();
  //     // }
  //   }
  // useEffect(() => async () => FetchImg(), [search, page, pagination]);

  const FetchImg = async () => {
    // const { page, pagination } = this.state;
    if (search === '') {
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchImagesWithQuery(search, page);
      const { hits, totalHits } = data;
      if (hits.length === 0) {
        toast.warn(
          '🦄 Sorry, there are no images matching your search query. Please try again.',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      } else if (page === 1 || pagination === 'Pagination') {
        setGalleryColection([...hits]);
        setTotalHits(totalHits);
        // this.setState({
        //   galleryColection: [...hits],
        //   totalHits,
        // });
      } else if (pagination === 'LoadMore') {
        // this.setState(state => ({
        //   galleryColection: [...state.galleryColection, ...hits],
        //   totalHits,
        // }));
        setGalleryColection(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);
      }
    } catch (error) {
      // this.setState({
      //   error,
      // });
      setError(error);
      toast.error('Sorry, something going wrong :(', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      // this.setState({ isLoading: false });
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    setActiveGalleryItem(null);
    // this.setState(({ activeGalleryItem }) => ({
    //   activeGalleryItem: null,
    // }));
  };
  const radioBtnChange = value => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    console.log(value);
    setPagination(value);
    setPage(1);
    setGalleryColection([]);
    // this.setState({ pagination: value, page: 1, galleryColection: [] });
  };

  const onSelectGalleryItem = item => {
    // this.setState({ activeGalleryItem: item });
    setActiveGalleryItem(item);
  };

  const heandleSubmitForm = ({ search: searchForm }) => {
    // console.log(pagination);
    // if (pagination !== 'LoadMore') {
    //   this.setState({ pagination: true });
    // } else if (this.state.pagination) {
    //   this.setState({ pagination: false });
    // }
    const normalizedSearch = searchForm.toLocaleLowerCase();
    if (normalizedSearch !== search) {
      // this.setState({
      //   search: normalizedSearch,
      //   page: 1,
      //   galleryColection: [],
      // });
      console.log(normalizedSearch);
      setSearch(normalizedSearch);
      setPage(1);
      setGalleryColection([]);
    }
  };
  const OnClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const OnPagination = page => {
    // console.log(page);
    // this.setState({ page });
    setPage(page);
  };

  const onDisableLoadMore = () => {
    // const { totalHits, page } = this.state;
    if (!totalHits) {
      return true;
    } else if (totalHits - PER_PAGE * page < 0) {
      return true;
    } else {
      return false;
    }
  };

  const showBtnLoadMore = () => {
    // const { totalHits } = this.state;
    if (totalHits / PER_PAGE > 1) {
      return true;
    } else {
      return false;
    }
  };
  const showGallery = () => {
    // const { totalHits } = this.state;
    if (totalHits) {
      return true;
    } else {
      return false;
    }
  };

  // console.log(this.state.gellaryColection);
  // const showBtnLoadMore = showBtnLoadMore();
  // const showGallery = showGallery();
  const countPages = Math.ceil(totalHits / PER_PAGE);
  return (
    <AppWrapper>
      <SearchBar
        onSubmit={heandleSubmitForm}
        paginationMode={pagination}
        isSubmitting={isLoading}
        radioBtnChange={radioBtnChange}
      />
      {/* {isLoading && galleryColection.length === 0 && <GallaryContentLoader />} */}
      {isLoading && <Loader />}
      {showGallery() && (
        <ImageGallery
          galleryColection={galleryColection}
          onSelectGalleryItem={item => {
            onSelectGalleryItem(item);
          }}
        />
      )}

      {activeGalleryItem && (
        <Modal onClose={toggleModal} activeGalleryItem={activeGalleryItem} />
      )}

      {showBtnLoadMore() && pagination === 'LoadMore' && (
        <Button
          onLoadMore={OnClickLoadMore}
          onDisableLoadMore={onDisableLoadMore}
        />
      )}
      {pagination === 'Pagination' && totalHits / PER_PAGE > 1 && (
        <GalleryPagination
          onPagination={OnPagination}
          countPages={countPages}
          currentPage={page}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
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
};

// export class App extends Component {
//   state = {
//     // showModal: false,
//     isLoading: false,
//     error: null,
//     galleryColection: [],
//     activeGalleryItem: null,
//     search: '',
//     page: 1,
//     totalHits: 0,
//     pagination: 'LoadMore',
//   };
//   componentDidMount() {
//     // console.log('App Mount');
//   }

//   componentWillUnmount() {
//     // console.log('App WillUnmount');
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     // console.log('App componentDidUpdate');
//     const { page, search, pagination } = this.state;
//     if (
//       prevState.search !== search ||
//       prevState.page !== page ||
//       prevState.pagination !== pagination
//     ) {
//       this.FetchImg();
//     }
//     // if (prevState.pagination !== pagination && search !== '') {
//     //   this.setState({ galleryColection: [], page: 1 });
//     //   this.FetchImg();
//     // }
//   }

//   FetchImg = async () => {
//     const { page, pagination } = this.state;
//     if (this.state.search === '') {
//       return;
//     }
//     this.setState({ isLoading: true });
//     try {
//       const data = await fetchImagesWithQuery(
//         this.state.search,
//         this.state.page
//       );
//       const { hits, totalHits } = data;
//       if (hits.length === 0) {
//         toast.warn(
//           '🦄 Sorry, there are no images matching your search query. Please try again.',
//           {
//             position: 'top-right',
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           }
//         );
//         return;
//       } else if (page === 1 || pagination === 'Pagination') {
//         this.setState({
//           galleryColection: [...hits],
//           totalHits,
//         });
//       } else if (pagination === 'LoadMore') {
//         this.setState(state => ({
//           galleryColection: [...state.galleryColection, ...hits],
//           totalHits,
//         }));
//       }
//     } catch (error) {
//       this.setState({
//         error,
//       });
//       toast.error('Sorry, something going wrong :(', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   toggleModal = () => {
//     // this.setState(({ showModal }) => ({
//     //   showModal: !showModal,
//     // }));
//     this.setState(({ activeGalleryItem }) => ({
//       activeGalleryItem: null,
//     }));
//   };
//   radioBtnChange = value => {
//     // this.setState(({ showModal }) => ({
//     //   showModal: !showModal,
//     // }));
//     console.log(value);
//     this.setState({ pagination: value, page: 1, galleryColection: [] });
//   };

//   onSelectGalleryItem = item => {
//     this.setState({ activeGalleryItem: item });
//   };

//   heandleSubmitForm = ({ search }) => {
//     // console.log(pagination);
//     // if (pagination !== 'LoadMore') {
//     //   this.setState({ pagination: true });
//     // } else if (this.state.pagination) {
//     //   this.setState({ pagination: false });
//     // }
//     const normalizedSearch = search.toLocaleLowerCase();
//     if (normalizedSearch && normalizedSearch !== this.state.search) {
//       this.setState({
//         search: normalizedSearch,
//         page: 1,
//         galleryColection: [],
//       });
//     }
//   };
//   OnClickLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
//   OnPagination = page => {
//     // console.log(page);
//     this.setState({ page });
//   };

//   onDisableLoadMore = () => {
//     const { totalHits, page } = this.state;
//     if (!totalHits) {
//       return true;
//     } else if (totalHits - PER_PAGE * page < 0) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   showBtnLoadMore = () => {
//     const { totalHits } = this.state;
//     if (totalHits / PER_PAGE > 1) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   showGallery = () => {
//     const { totalHits } = this.state;
//     if (totalHits) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   render() {
//     const { activeGalleryItem, isLoading, totalHits, pagination } = this.state;
//     // console.log(this.state.gellaryColection);
//     const showBtnLoadMore = this.showBtnLoadMore();
//     const showGallery = this.showGallery();
//     const countPages = Math.ceil(totalHits / PER_PAGE);
//     return (
//       <AppWrapper>
//         <SearchBar
//           onSubmit={this.heandleSubmitForm}
//           paginationMode={pagination}
//           isSubmitting={isLoading}
//           radioBtnChange={this.radioBtnChange}
//         />
//         {/* {isLoading && galleryColection.length === 0 && <GallaryContentLoader />} */}
//         {isLoading && <Loader />}
//         {showGallery && (
//           <ImageGallery
//             galleryColection={this.state.galleryColection}
//             onSelectGalleryItem={item => {
//               this.onSelectGalleryItem(item);
//             }}
//           />
//         )}

//         {activeGalleryItem && (
//           <Modal
//             onClose={this.toggleModal}
//             activeGalleryItem={this.state.activeGalleryItem}
//           />
//         )}

//         {showBtnLoadMore && pagination === 'LoadMore' && (
//           <Button
//             onLoadMore={this.OnClickLoadMore}
//             onDisableLoadMore={this.onDisableLoadMore}
//           />
//         )}
//         {pagination === 'Pagination' && totalHits / PER_PAGE > 1 && (
//           <GalleryPagination
//             onPagination={this.OnPagination}
//             countPages={countPages}
//             currentPage={this.state.page}
//           />
//         )}

//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </AppWrapper>
//     );
//   }
// }
