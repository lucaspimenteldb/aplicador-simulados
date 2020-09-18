// eslint-disable-next-line import/no-mutable-exports
import storage from '../../storage/storage';

const funcao = async (to, from, next) => {
  const token = await storage.getToken();
  
  if (to.name === 'Login' && token) {
    next({ path: '/home' });
  }
  if (!token && to.name !== 'Login') {
    storage.delete('token');
    next({ path: '/' });
  }

  next();
};

export default funcao;
