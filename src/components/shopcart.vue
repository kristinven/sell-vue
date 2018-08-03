<template>
    <div id="shopcart">
        <div class="content">
            <div class="cart-wrapper" @click="showList">
                <span class="icon-shopping_cart" :class="{noZCount: totalCount > 0}"></span>
                <span class="count" v-if="totalCount > 0">{{totalCount}}</span>
            </div>
            <div class="delivery-fee" @click="showList">
                <span class="totalPrice" :class="{noZPrice: totalPrice > 0}">￥{{totalPrice}}</span>
                <span class="deliveryPrice">另需配送费￥{{deliveryPrice}}元</span>
            </div>
            <div class="pay" :class="{toPay: totalPrice >= minPrice}">
                {{info}}
            </div>
        </div>
        <div class="selected-list" v-show="!bold && totalCount > 0">
            <div class="gray" @click="showList"></div>
            <div class="list-wrapper">
                <div class="list-title">
                    <span class="title">购物车</span>
                    <span class="clear" @click="clearList">清空</span>
                </div>
                <div class="list" ref="list">
                    <div class="con-wrapper">
                        <div class="list-item" v-for="(food,index) in selectedFood" :key="index">
                            <span class="name">{{food.name}}</span>
                            <span class="price">￥{{food.price}}</span>
                            <cartcontrol class="cartcontrol" :food="food"></cartcontrol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartcontrol from './cartcontrol'
import BScroll from 'better-scroll'

export default {
    props: {
        minPrice: {
            type: Number
        },
        deliveryPrice: {
            type: Number
        },
        selectedFood: {
            type: Array,
            default: [{
                name: '米饭',
                count: 10,
                price: 2
            },{
                name: '鱼香肉丝',
                count: 1,
                price: 20
            }]
        }   
    },
    data() {
        return {
            bold: true
        }
    },
    components: {
        cartcontrol
    },
    computed: {
        totalCount() {
            let totalCount = 0;
            this.selectedFood.forEach(food => {
                totalCount += food.count;
            })
            return totalCount;
        },
        totalPrice() {
            let totalPrice = 0;
            this.selectedFood.forEach(food => {
                totalPrice += food.count * food.price;
            })
            return totalPrice;
        },
        info() {
            if(this.totalPrice == 0) {
                return `￥${this.minPrice}`
            }else if(this.totalPrice > 0 && this.totalPrice < this.minPrice) {
                return `还差￥${this.minPrice - this.totalPrice}元起送`
            }else {
                return `去结算`
            }
        }
    },
    methods: {
        showList() {
            if(this.totalCount > 0) {
                this.bold = !this.bold;
            }else {
                this.bold = true;
            }
        },
        clearList() {
            this.selectedFood.forEach(food => {
                food.count = 0;
            })
            this.bold = true;
        }
    },
    mounted() {
        new BScroll(this.$refs.list, {
            click: true
        })
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../../static/style.css'
@import '../assets/stylus/index.styl'

#shopcart
    position fixed
    left 0
    bottom 0
    height 48px
    width 100%
    background #141d27
    z-index 1
    .content
        display flex
        .cart-wrapper
            flex 0 0 80px
            position relative
            .icon-shopping_cart
                display inline-block
                margin-left 15px
                margin-top -10px
                width 44px
                height 44px
                border-radius 50%
                border 6px solid #141d27
                background #2b343c
                font-size 24px
                color rgba(255,255,255,0.4)
                line-height 44px
                text-align center
                &.noZCount
                    background rgb(0,160,220)
                    color #fff
            .count
                position absolute
                right 10px
                top -10px
                width 24px
                height 16px
                line-height 16px
                border-radius 8px
                font-size 9px
                font-weight 700
                color #fff
                text-align center
                background-color rgb(240,20,20)
                box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .delivery-fee
            flex 1
            padding 12px 12px 12px 0
            font-size 0
            .totalPrice
                display inline-block
                font-size 16px
                color rgba(255,255,255,0.4)
                font-weight 700
                line-height 24px
                padding-right 12px
                border-1px-right rgba(255,255,255,0.1)
                &.noZPrice
                    color #fff
            .deliveryPrice
                display inline-block
                padding-left 12px
                font-size 12px
                color rgba(255,255,255,0.4)
                line-height 24px
        .pay
            flex 0 0 89px  
            width 89px
            height 48px
            padding 0 8px
            background-color #2b333b
            font-size 12px
            color rgba(255,255,255,0.4)
            font-weight 700
            line-height 48px
            text-align center
            &.toPay    
                background rgb(0,180,60)
                color #fff
    .selected-list
        position fixed
        top 0
        left 0
        right 0
        bottom 48px
        z-index -1
        display flex
        flex-direction column
        .gray
            flex 1
            background rgba(7,17,27,0.6)
        .list-wrapper
            max-height 217px
            backgroud #fff
            overflow hidden
            font-weight 400
            .list-title
                height 40px
                padding 0 18px
                background #f3f5f7
                border-1px rgba(7,17,27,0.1)
                .title
                    font-size 14px
                    color rgb(7,17,27)
                    line-height 40px
                .clear
                    float right 
                    font-size 12px
                    color rgb(0,160,220)
                    line-height 40px
            .list
                background #fff
                .con-wrapper
                    max-height 176px
                    overflow auto
                .list-item 
                    position relative
                    height 48px
                    margin 0 18px
                    border-1px rgba(7,17,27,0.1)
                    &:last-child
                        border-1px #fff
                    .name
                        font-size 14px
                        color rgb(7,17,27)
                        line-height 48px
                    .price
                        position absolute
                        right 90px
                        font-size 14px
                        color rgb(240,20,20)
                        line-height 48px                        
                    .cartcontrol
                        position absolute
                        right 0
                        bottom 6px



</style>    
