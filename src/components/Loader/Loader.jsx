import { ThreeCircles } from 'react-loader-spinner';
import { SpinerWraper } from './Loader.styled';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const Loader = () => {
  return (
    <SpinerWraper>
      <ThreeCircles
        height="50"
        width="50"
        color="#4e44c4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="red"
        innerCircleColor=""
        middleCircleColor="green"
      />
    </SpinerWraper>
  );
};
export default Loader;
