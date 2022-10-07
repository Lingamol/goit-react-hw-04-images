import { Component } from 'react';
import PropTypes from 'prop-types';
import { GallaryList } from './ImageGallery.styled';
import GallaryItem from '../ImageGalleryItem';
class ImageGallery extends Component {
  // state = {
  //   activeGalleryItem: {},
  // };
  // setactiveGalleryItem = item => {
  //   this.setState({ activeGalleryItem: item });
  // };
  render() {
    const { galleryColection, onSelectGalleryItem } = this.props;
    return (
      <GallaryList className="gallery">
        <GallaryItem
          galleryColection={galleryColection}
          onSelectGalleryItem={onSelectGalleryItem}
        />
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
