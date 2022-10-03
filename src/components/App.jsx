import ImageGallery from './ImageGallery';
import GallaryItem from './ImageGalleryItem';
import Modal from './Modal';
import Searchbar from './Searchbar';
const onSearch = () => {};
export const App = () => {
  return (
    <div
    // style={{
    //   height: '100vh',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   fontSize: 40,
    //   color: '#010101'
    // }}
    >
      {/* React homework template */}
      <Searchbar onSearch={onSearch} />
      <ImageGallery />
      <GallaryItem />
      <Modal />
    </div>
  );
};
