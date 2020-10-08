import axios from 'axios';
import env from '../env';

function returnToken () {
  return JSON.parse(localStorage.getItem('token')) || '';
}

const http = axios.create({
  baseURL: env.ROOT_API,
  headers: {
    Authorization: `Bearer ${returnToken().token}`,
  },
});

export default http;
