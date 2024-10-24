import axios from 'axios';

const API_URL = 'http://localhost:5000/api/films';

const getFilms = () => {
  return axios.get(API_URL);
};

export default { getFilms };
