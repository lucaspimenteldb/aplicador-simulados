// eslint-disable-next-line import/no-cycle
import { Busao } from '../../main';
// eslint-disable-next-line import/no-mutable-exports
import storage from '../../storage/storage';

const funcao = async (to, from, next) => {
  const token = await storage.getToken();
  
  if (to.name === 'Login' && token) {
    next({ path: '/home' });
  }
  if (!token && (to.name !== 'Login' && to.name !== 'EsqueciSenha' && to.name !== 'ChangePassword')) {
    storage.delete('token');
    Busao.$emit('autenticado', false);
    next({ path: '/' });
  }

  next();
};

export default funcao;
