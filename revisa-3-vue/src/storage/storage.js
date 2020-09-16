// import axios from 'axios';
// import env from '../env';

const storage = {};

storage.get = function () {
  // const token = window.localStorage.setItem('nome', 'nome');
  // // const headers = { Authorization: token };
  //
  // if (token) {
  //   try {
  //     // eslint-disable-next-line no-unused-vars
  //     // const dados = await axios.get(`${env.ROOT_API}/session/loading-session`, { headers });
  //     return token;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }
    
  console.log('Ok');

  return 'oi';
};

storage.set = function (key) {
  window.localStorage.setItem('token', key);
};

export default storage;
