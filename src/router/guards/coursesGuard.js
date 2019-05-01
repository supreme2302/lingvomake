import store from '@/store/index.js'

export default (to, from, next) => {
  console.log('call courses guard');
  store.dispatch('loadCourses')
      .then(() => next())
      .catch(() => next('/'));
}
