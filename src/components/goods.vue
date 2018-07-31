<template>
    <div id="goods">
        <div class="menu-list" ref="menuList">
            <div class="menu-wrapper">
                <div class="menu-item" v-for="(good,index) in goods" :key="index" @click="scrollToItems(index, $event)" :class="{active: currentIndex === index}">
                    <div class="text-wrapper">
                        <span class="icon" v-if="good.type > 0" :class="classType[good.type]"></span>
                        <span class="text">{{good.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="foods-list" ref="foodsList">
            <ul>
                <li class="food-list-hook" v-for="(items,index) in goods" :key="index">
                    <div class="items-title">{{items.name}}</div>
                    <ul>
                        <li class="item-wrapper" v-for="(item2,index2) in items.foods" :key="index2">
                            <div class="item-icon">
                                <img :src="item2.icon" alt="">
                            </div>
                            <div class="description">
                                <div class="name">
                                    {{item2.name}}
                                </div>
                                <div class="desc">
                                    {{item2.description}}
                                </div>
                                <div class="ratings">
                                    <span>月售{{item2.sellCount}}份</span>
                                    <span style="margin-left: 12px">好评率{{item2.rating}}%</span>
                                </div>
                                <div class="prices">
                                    <span class="price">
                                        <i>￥</i>{{item2.price}}
                                    </span>
                                    <span class="oldPrice" v-if="item2.oldPrice">
                                        ￥{{item2.oldPrice}}
                                    </span>
                                </div>
                                <cartcontrol class="cartcontrol" :food="item2"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :selectedFood="selectedFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Vue from 'vue'
import shopcart from './shopcart'
import cartcontrol from './cartcontrol'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [{
                name: '',
                type: -1,
                foods: [{}]
            }],
            classType: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            menuScroll: null,
            foodScroll: null,
            currentIndex: 0,
            foodListArr: [],
            foodListDoms: null
        }
    },
    components: {
        shopcart,
        cartcontrol
    },
    computed: {
        selectedFood() {
            let arr = [];
            this.goods.forEach(group => {
                group.foods.forEach(food => {
                    if(food.count > 0) {
                        arr.push(food);
                    }
                })
            })
            return arr;
        }
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuList, {
                click: true
            });
            this.foodScroll = new BScroll(this.$refs.foodsList, {
                click: true,
                probeType: 2  // 滚动中实时派发scroll事件
            });
            this.foodScroll.on('scroll', (event) => {
                if(event.y > 0) {
                    this.currentIndex = 0;
                }else {
                    var len = this.foodListArr.length;
                    for(var i = 0; i < len; i++) {
                        if(event.y <= this.foodListArr[i] && event.y > this.foodListArr[i+1] || !this.foodListArr[i+1]) {
                            this.currentIndex = i;
                            break;
                        }
                    }
                }
            })
        },
        scrollToItems(index, event) {
            if(!event._constructed) { 
                return; // 过滤掉浏览器自带click事件
            }
            this.currentIndex = index;
            this.foodScroll.scrollToElement(this.foodListDoms[index], 300);
        },
        calculateHeight() {
            this.foodListDoms = this.$refs.foodsList.getElementsByClassName('food-list-hook');
            var len = this.foodListDoms.length;
            var height = 0;
            this.foodListArr.push(height);
            for(var i = 0; i < len-1; i++) {
                height -= this.foodListDoms[i].clientHeight;
                this.foodListArr.push(height);
            }
        }
    },
    created() {
        axios.get('/goods').then(res => {
            if(res.data.type === 0) {
                this.goods = res.data.data;

                Vue.nextTick(() => {
                    this._initScroll();
                    this.calculateHeight();
                });
            }
        })
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'

#goods
    position fixed 
    top 174px
    bottom 48px
    left 0
    display flex
    width 100%
    overflow hidden
    font-weight normal
    .menu-list
        flex 0 0 80px
        width 80px
        background #f3f5f7
        .menu-item
            height 54px
            padding 0 12px
            &.active
                position relative
                background #fff
                font-weight 500
                margin-top -1px
                .text-wrapper
                    border-1px #fff
            &:last-child
                .text-wrapper
                    border-1px #f3f5f7
            .text-wrapper
                display table-cell
                height 54px
                width 56px
                border-1px rgba(7,17,27,0.1)
                vertical-align middle
                text-align left
                font-size 0
                .icon
                    display inline-block
                    width 14px
                    height 14px
                    background-size 100% 100%
                    vertical-align top
                    &.decrease
                        bg-image 'decrease_3'
                    &.discount
                        bg-image 'discount_3'
                    &.special
                        bg-image 'special_3'
                    &.invoice
                        bg-image 'invoice_3'
                    &.guarantee
                        bg-image 'guarantee_3'
                .text
                    font-size 12px
                    color #07111b
                    line-height 14px
    .foods-list
        flex 1
        backgroud #ffffff
        .food-list-hook
            .items-title
                width 100%
                height 26px
                background-color #f3f5f7
                border-left 4px solid #d9dde1
                padding-left 14px
                font-size 12px
                color rgb(147,153,159)
                line-height 26px
                font-weight 500
            .item-wrapper
                position relative
                margin 18px
                display flex
                border-1px rgba(7,17,27,0.1)
                &:last-child
                    border-1px #fff
                .item-icon
                    flex 0 0 57px
                    width 57px
                    height 57px
                    overflow hidden
                    img 
                        set-img 57px
                .description
                    flex 1
                    margin-left 10px
                    margin-top 2px
                    .name
                        font-size 14px
                        color rgb(7,17,27)
                    .desc,.ratings
                        margin-top 8px
                        font-size 10px
                        color rgb(147,153,159)
                    .prices
                        font-size 0
                        font-weight 700
                        line-height 48px
                        .price
                            font-size 20px
                            color rgb(240,20,20)
                            i 
                                font-size 15px
                        .oldPrice
                            font-size 10px
                            color rgb(147,153,159)
                            vertical-align top
                            text-decoration line-through
                    .cartcontrol
                        position absolute 
                        right 0
                        bottom 12px


                    
</style>
