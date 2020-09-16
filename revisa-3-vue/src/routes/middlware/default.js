import storage from '../../storage/storage';

export default (to, from, next) => {
  const token = storage.get();

  if (!token) {
    next({ path: '/' });
  }

  if (to.name === 'Login' && token) {
    next({ path: '/home' });
  }

  next();
};
