import store from '@/store/index.js';

export default (to, from, next) => {
  console.log('call students guard');
  //todo проверять авторизацию
  store.dispatch('loadStudents')
	  .then(() => next())
	  .catch(() => next('/'));
}
