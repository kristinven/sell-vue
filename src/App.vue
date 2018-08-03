<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import '../mock'
import axios from 'axios'
import header from './components/header'

export default {
  name: 'App',
  data() {
    return{
      seller: {
        avatar: '',
        name: '',
        description: '',
        deliveryTime: 0,
        bulletin: '',
        supports: [],
        deliveryPrice: 4,
        minPrice: 20
      }
    }
  },
  components: {
    "v-header": header
  },
  created() {
    axios.get('/seller').then(res => {
      if(res.data.type === 0) {
        this.seller = res.data.data;
      }
    })
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../static/style.css'
@import './assets/stylus'

html,body
  width 100%
  height 100%

#app
  position relative
  width 100%
  height 100%
  overflow hidden
  .tab
    display flex
    height 40px
    font-weight normal
    border-1px rgba(7,17,27,0.1)
    .tab-item
      flex 1
      font-size 14px
      line-height 40px
      text-align center
      a
        display inline-block
        width 100%
        height 100%
        color rgb(77,85,93)
        &.router-link-active
          color rgb(240,20,20)
</style>
