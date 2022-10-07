import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

const Button = ({ onLoadMore, onDisableLoadMore }) => {
  return (
    <LoadMoreBtn
      onClick={onLoadMore}
      type="button"
      disabled={onDisableLoadMore()}
    >
      Load more
    </LoadMoreBtn>
  );
};
export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  onDisableLoadMore: PropTypes.func.isRequired,
};
