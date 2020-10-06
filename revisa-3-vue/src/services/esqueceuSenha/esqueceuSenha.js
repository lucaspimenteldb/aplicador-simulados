import axios from 'axios';
import env from '../../env';

const senha = {};

senha.esqueciSenha = async function (url, body) {
  try {
    const headers = { headers: {} };
    const dados = axios.post(env.ROOT_API + url, body, headers);

    return dados;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default senha;
