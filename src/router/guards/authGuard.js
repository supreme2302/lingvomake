import bus from '../../modules/bus';
import store from '../../store';
export default (to, from, next) => {
  console.log('auth-guard');
  if (store.getters.user) {
    next();
  } else {
	bus.on('onAuth', data => {
	  const user = data.payload;
	  if (user) {
	    next();
	  } else {
		next('/registration?authError=true');
      }
	});
  }
}
