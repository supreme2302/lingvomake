import store from '../../store';
export default (to, from, next) => {
  console.log('already-auth-guard');
  if (store.getters.user) {
    next('/');
  } else {
    next();
  }
}
