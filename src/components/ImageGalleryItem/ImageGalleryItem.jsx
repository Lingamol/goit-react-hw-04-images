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
