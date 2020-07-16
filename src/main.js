import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'
import fastclick from 'fastclick'

Vue.config.productionTip = false


Vue.use(toast)
//移动端300ms点击延迟
fastclick.attach(document.body)

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
