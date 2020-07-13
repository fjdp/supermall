import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false


Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})
/* eslint-disable no-new */
Vue.prototype.$bus = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// require('./assets/css/base.css')
