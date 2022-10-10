import { Component } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { GallaryList } from './ImageGallery.styled';
import GallaryItem from '../ImageGalleryItem';
class ImageGallery extends Component {
  render() {
    const { galleryColection, onSelectGalleryItem } = this.props;
    return (
      <GallaryList className="gallery">
        {galleryColection.map(item => (
          <GallaryItem
            key={item.id}
            galleryItem={item}
            onSelectGalleryItem={onSelectGalleryItem}
          />
        ))}
      </GallaryList>
    );
  }
}
export default ImageGallery;

ImageGallery.ptopTypes = {
  onSelectGalleryItem: PropTypes.func.isRequired,
  galleryColection: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
