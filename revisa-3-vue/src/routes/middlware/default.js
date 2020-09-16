// eslint-disable-next-line import/no-mutable-exports
import storage from '../../storage/storage';

const funcao = async (to, from, next) => {
  const token = await storage.getToken();
  console.log(token);
  
  if (to.name === 'Login' && token) {
    next({ path: '/home' });
  }
  if (!token && to.name !== 'Login') {
    next({ path: '/' });
  }

  next();
};

export default funcao;
