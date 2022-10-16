import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import SearchBar from './Searchbar';
import { useState, useEffect } from 'react';
import { AppWrapper } from './App.styled';
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

  useEffect(() => {
    const FetchImg = async () => {
      setIsLoading(true);
      setError(null);
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
          // setGalleryColection([]);
          setTotalHits(0);
          return;
        } else if (page === 1 || pagination === 'Pagination') {
          setGalleryColection([...hits]);
          setTotalHits(totalHits);
        } else if (pagination === 'LoadMore') {
          setGalleryColection(prevState => [...prevState, ...hits]);
          setTotalHits(totalHits);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (search === '') {
      return;
    }
    FetchImg();
  }, [search, page, pagination]);

  useEffect(() => {
    if (error === null) {
      return;
    }
    toast.error('Sorry, something going wrong :(', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [error]);

  const toggleModal = () => {
    setActiveGalleryItem(null);
  };

  const radioBtnChange = value => {
    setPagination(value);
    setPage(1);
    setGalleryColection([]);
  };

  const heandleSubmitForm = ({ search: searchForm }) => {
    const normalizedSearch = searchForm.toLocaleLowerCase();
    if (normalizedSearch !== search) {
      setSearch(normalizedSearch);
      setPage(1);
      setGalleryColection([]);
    }
  };

  const OnClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onDisableLoadMore = () => {
    if (!totalHits) {
      return true;
    } else if (totalHits - PER_PAGE * page < 0) {
      return true;
    } else {
      return false;
    }
  };

  const showBtnLoadMore = () => {
    if (totalHits / PER_PAGE > 1) {
      return true;
    } else {
      return false;
    }
  };
  const showGallery = () => {
    if (totalHits) {
      return true;
    } else {
      return false;
    }
  };

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
            setActiveGalleryItem(item);
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
          onPagination={setPage}
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
