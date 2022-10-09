import PropTypes from 'prop-types';
import { GallaryItem, GallaryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ galleryItem, onSelectGalleryItem }) => {
  const { webformatURL } = galleryItem;
  return (
    <GallaryItem className="gallery-item">
      <GallaryItemImg
        src={webformatURL}
        alt=""
        onClick={() => onSelectGalleryItem(galleryItem)}
      />
    </GallaryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.ptopTypes = {
  onSelectGalleryItem: PropTypes.func.isRequired,
  galleryItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
