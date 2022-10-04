import { LoadMoreBtn } from './Button.styled';
// const onLoadMore=()=>{props.}
const Button = ({ onLoadMore }) => {
  return (
    <LoadMoreBtn
      onClick={() => {
        onLoadMore();
      }}
      type="button"
    >
      Load more
    </LoadMoreBtn>
  );
};
export default Button;
