import store from '@/store/';

export default (to, from, next) => {
    store.dispatch('getQuiz', to.params.id)
        .then(() => next())
        .catch(() => next('/registration?authError=true'))
}
