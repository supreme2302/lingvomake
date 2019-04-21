// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App';
import i18n from '@/i18n';
import router from '@/router';
import store from '@/store';
import bus from './modules/bus';
import { HTTP } from "./plugins/axios.js";
// Sync store with router
sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
  created () {
      this.$store.commit('setRenderPermission', false);
      const promise = HTTP.get('/admin/info');
      promise.then(
          resp => {
              console.log(resp.data);
              this.$store.commit('setUser', resp.data);
              bus.emit('onAuth', resp.data);
              this.$store.commit('setRenderPermission', true);
          }
      ).catch(
          () => {
              bus.emit('onAuth', null);
              this.$store.commit('setRenderPermission', true);
          }
      )
  },
}).$mount('#app');
