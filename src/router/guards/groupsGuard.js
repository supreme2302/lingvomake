import store from '@/store/';
import { HTTP } from '../../plugins/axios.js';
import API from '../../utils/API.js';
export default (to, from, next) => {
  console.log('groups guard');

  //TODO вернуть, как Костя добавит загрузку юнитов
  store.dispatch('loadCourses')
	  .then(() => {
	    store.dispatch('loadUnits')
			.then(() => {
			  store.dispatch('loadGroups')
				  .then(() => next())
				  .catch(() => next('/registration?authError=true'))
			})
			.catch(() => next('/registration?authError=true'))
	  })
	  .catch(() => next('/registration?authError=true'))


  // store.dispatch('loadCourses')
	//   .then(() => {
	// 		  store.dispatch('loadGroups')
	// 			  .then(() => next())
	// 			  .catch(() => next('/registration?authError=true'))
	//   })
	//   .catch(() => next('/registration?authError=true'))

}
