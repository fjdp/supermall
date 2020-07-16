import toast from './Toast'
const obj = {}

obj.install = function (Vue){
  // 1 创建组件构造器
  const toastCon = Vue.extend(toast)
  // 2 new的方式,根据组件构造器,可以创建出来一个组件对象
  const Toast = new toastCon()
  // 3 将组件对象,手动挂载到某一元素上
  Toast.$mount(document.createElement('div'))
  // 4 Toast对应的$el就是duv
  document.body.appendChild(Toast.$el)
  Vue.prototype.$toast = Toast  
}
export default obj