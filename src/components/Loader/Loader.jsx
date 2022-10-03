import { ThreeCircles } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const Loader = () => {
  return (
    <div>
      <ThreeCircles
        height="100"
        width="100"
        color="#4e44c4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="red"
        innerCircleColor=""
        middleCircleColor="green"
      />
    </div>
  );
};
export default Loader;
