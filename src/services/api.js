import axios from 'axios';
// axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.baseURL = 'https://pixabay.com/api';
// axios.defaults.headers.common['key'] = process.env.REACT_APP_API_KEY;

const params = {
  key: '29487870-d36fe710dee1f0536a07f7119',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};
let currentPage = 1;
const fetchImagesWithQuery = async searchQuery => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}`,
    { params }
  );
  // console.log('response.data.hits', response.data.hits);
  return response.data.hits;
};

export default fetchImagesWithQuery;

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
