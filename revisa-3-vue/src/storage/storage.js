import axios from 'axios';
import env from '../env';

const storage = {};

storage.getToken = async function () {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    try {
      const headers = { Authorization: `Bearer ${token.token}` };
      // eslint-disable-next-line no-unused-vars
      const dados = await axios.get(`${env.ROOT_API}session/loading-session`, { headers });
      return token.token;
    } catch (err) {
      return null;
    }
  }

  return token;
};

storage.set = function (key, value) {
  localStorage.setItem(key, value);
};

storage.get = function (key) {
  const value = localStorage.getItem(key);
  return value;
};

storage.delete = function (key) {
  localStorage.removeItem(key);
};

export default storage;
