import store from '@/store/index.js';

export default (to, from, next) => {
  console.log('call courses guard');
  //todo проверять авторизацию
  store.dispatch('loadCourses')
      .then(() => next())
      .catch(() => next('/'));
}
