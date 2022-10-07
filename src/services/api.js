import axios from 'axios';
// import { PER_PAGE } from 'components/App.jsx';
// axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.baseURL = 'https://pixabay.com/api';
// axios.defaults.headers.common['key'] = process.env.REACT_APP_API_KEY;
export const PER_PAGE = 40;

const params = {
  key: '29487870-d36fe710dee1f0536a07f7119',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
};
// let currentPage = 1;
export const fetchImagesWithQuery = async (searchQuery, currentPage) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}`,
    { params }
  );
  // console.log('response.data.hits', response.data);
  return response.data;
};

// export fetchImagesWithQuery;

// export const getBreeds = async () => {
//   const response = await axios.get('/breeds');
//   return response.data;
// };

// export const getDogByBreed = async breed => {
//   const response = await axios.get('/images/search`', {
//     params: { breed_id: breed },
//   });
//   return response.data[0];
// };
// const fetchData = async q => {
//   const params = {
//     key: '29487870-d36fe710dee1f0536a07f7119',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 40,
//   };

//   const url = `https://pixabay.com/api/?q=${q}&page=${currentPage}`;
