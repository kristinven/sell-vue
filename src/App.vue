<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item" @click="transDataType = 0">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" @click="transDataType = 1">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller" @click="transDataType = -1">商家</router-link>
      </div>
    </div>
    <router-view :goods="goods" :ratings="ratings" :seller="seller"></router-view>
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
      transDataType: 0,  //传给router-view的数据类型：goods(0),ratings(1),null(-1)
      seller: {
        avatar: '',
        name: '',
        description: '',
        deliveryTime: 0,
        bulletin: '',
        supports: [],
        deliveryPrice: 4,
        minPrice: 20
      },
      goods: [{
          name: '',
          type: -1,
          foods: [{}]
      }],
      ratings: [{
        score: 0
      }]
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
    });
    axios.get('/goods').then(res => {
      if(res.data.type === 0) {
        this.goods = res.data.data;
      }
    });
    axios.get('/ratings').then(res => {
      if(res.data.type === 0) {
        this.ratings = res.data.data;
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
