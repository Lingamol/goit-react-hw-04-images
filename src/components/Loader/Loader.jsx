// import { ThreeCircles } from 'react-loader-spinner';
import { SpinerWraper, Spiner } from './Loader.styled';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
  return (
    <SpinerWraper>
      <Spiner
        height="300"
        width="300"
        color="#4e44c4"
        wrapperStyle={{}}
        wrapperClass="spiner"
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
