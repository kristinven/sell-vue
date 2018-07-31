import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods.vue'
import Ratings from '../components/ratings.vue'
import Seller from '../components/seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
  ]
})
