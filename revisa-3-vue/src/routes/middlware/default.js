// eslint-disable-next-line import/no-cycle
import { Busao } from '../../main';
// eslint-disable-next-line import/no-mutable-exports
import storage from '../../storage/storage';

const funcao = async (to, from, next) => {
  const token = await storage.getToken();
  
  if (to.meta.public && token) {
    next({ path: '/home' });
  }
  if (!token && (!to.meta.public)) {
    storage.delete('token');
    Busao.$emit('autenticado', false);
    next({ path: '/' });
  }

  next();
};

export default funcao;
