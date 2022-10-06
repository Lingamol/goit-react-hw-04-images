import axios from 'axios';

export const fetchImagesWithQuery = async searchQuery => {
  const response = axios.get(`/search?query=${searchQuery}`);
  return response.data.hits;
};

export default fetchImagesWithQuery;
