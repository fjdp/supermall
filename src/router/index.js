import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../views/home/Home'
// import Cart from '../views/cart/Cart'
// import Category from '../views/category/Category'
// import Profile from '../views/profile/Profile'

const Home = ()=>  import('../views/home/Home')
const Cart = ()=>  import('../views/cart/Cart')
const Category = ()=>  import('../views/category/Category')
const Profile = ()=>  import('../views/profile/Profile')

Vue.use(Router)
//连续点击路由跳转报错,,看replace还是push
// const originalPush = Router.prototype.replace
// Router.prototype.replace = function replace(location) {
//    return originalPush.call(this, location).catch(err => err)
// }
export default new Router({
  mode:'history',
  // linkActiveClass:'active',
  routes: [
    {
      path:'',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
