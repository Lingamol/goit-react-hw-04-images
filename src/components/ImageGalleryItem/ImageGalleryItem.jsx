import PropTypes from 'prop-types';
import { GallaryItem, GallaryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ galleryColection, onSelectGalleryItem }) => {
  return galleryColection.map(item => (
    <GallaryItem key={item.id} className="gallery-item">
      <GallaryItemImg
        src={item.webformatURL}
        alt=""
        onClick={() => onSelectGalleryItem(item)}
      />
    </GallaryItem>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.ptopTypes = {
  onSelectGalleryItem: PropTypes.func.isRequired,
  galleryColection: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
