import axios from 'axios';
import env from '../../env';
import storage from '../../storage/storage';

const desempenho = {};

function verificarToken (token) {
  if (!token) {
    storage.delete('token');
    window.location.href = '';
  }
}

desempenho.desempenhoAluno = async function (url) {
  try {
    const token = await storage.getToken();
    verificarToken(token);
    const headers = { headers: { authorization: `Bearer ${token}` } };
    const dados = await axios.get(env.ROOT_API + url, headers);
    return dados;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default desempenho;
