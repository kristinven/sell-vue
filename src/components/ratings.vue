<template>
    <div id="ratings" ref="ratings">
        <div class="ratings-wrapper">
            <div class="score-wrapper">
                <div class="score-info">
                    <div class="score">{{seller.score}}</div>
                    <div class="title">综合评分</div>
                    <div class="desc">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="score-detail">
                    <div class="service detail-item">
                        <span class="title">服务态度</span>
                        <div class="star">
                            <span class="star-item star-on" v-for="n in starOnCount_serv" :key="n"></span>
                            <span class="star-item star-half" v-for="n in starHalfCount_serv" :key="n + starOnCount_serv"></span>
                            <span class="star-item star-off" v-for="n in starOffCount_serv" :key="n + starOnCount_serv + starHalfCount_serv"></span>
                        </div>
                        <span class="scoreNum">{{seller.serviceScore}}</span>
                    </div>
                    <div class="food detail-item">
                        <span class="title">商品评分</span>
                        <div class="star">
                            <span class="star-item star-on" v-for="n in starOnCount_food" :key="n"></span>
                            <span class="star-item star-half" v-for="n in starHalfCount_food" :key="n + starOnCount_food"></span>
                            <span class="star-item star-off" v-for="n in starOffCount_food" :key="n + starOnCount_food + starHalfCount_food"></span>
                        </div>
                        <span class="scoreNum">{{seller.foodScore}}</span>
                    </div>
                    <div class="deliveryTime detail-item">
                        <span class="title">送达时间</span>
                        <span class="time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <my-comment class="comment" :ratings="ratings"></my-comment>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import comment from './comment'
import BScroll from 'better-scroll'
import Vue from 'vue'

export default {
    props: {
        seller: {
            type: Object
        },
        ratings: {
            type: Array
        }
    },
    data() {
        return {
        }
    },
    components: {
        'my-comment': comment
    },
    created() {
        Vue.nextTick(() => {
            new BScroll(this.$refs.ratings, {
                click: true
            });
        })
    },
    computed: {
        starOnCount_serv() {
            return Math.floor(this.seller.serviceScore) || 0;
        },
        starHalfCount_serv() {
            return (this.seller.serviceScore - this.starOnCount_serv > 0.5) ? 1 : 0;
        },
        starOffCount_serv() {
            return (5 - this.starOnCount_serv - this.starHalfCount_serv) || 0;
        },
        starOnCount_food() {
            return Math.floor(this.seller.foodScore) || 0;
        },
        starHalfCount_food() {
            return (this.seller.foodScore - this.starOnCount_food > 0.5) ? 1 : 0;
        },
        starOffCount_food() {
            return (5 - this.starOnCount_food - this.starHalfCount_food) || 0;
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
@import '../../static/style.css'

#ratings
    position fixed
    top 174px
    left 0
    bottom 0
    right 0
    background #f3f5f7
    overflow hidden
    .score-wrapper
        display flex
        padding 18px 0
        background #fff
        border-1px rgba(7,17,27,0.1)
        .score-info
            flex 0 0 137px
            border-1px-right rgba(7,17,27,0.1)
            text-align center
            .score
                font-size 24px
                color rgb(255,153,0)
                line-height 28px
                font-weight 700
            .title
                margin 6px 0 8px
                font-size 12px
                color rgb(7,17,27)
                line-height 12px
                font-weight normal 
            .desc    
                margin-bottom 6px
                font-size 10px
                color rgb(7,17,27)
                line-height 10px
        .score-detail
            flex 1
            padding-left 24px
            .detail-item
                display block
                margin-bottom 8px
                font-size 0
                &:last-child
                    margin-bottom 0
            .title
                display inline-block
                font-size 12px
                color rgb(7,17,27)
                line-height 18px
                vertical-align top
            .star
                display inline-block
                margin 0 12px
                font-size 0
                vertical-align top
                .star-item
                    display inline-block
                    width 15px
                    height 15px
                    margin-right 6px
                    background-size 100% 100%
                    &.star-on
                        bg-image 'star36_on'
                    &.star-half
                        bg-image 'star36_half'
                    &.star-off
                        bg-image 'star36_off'    
                    &:last-child
                        margin-right 6px
            .scoreNum
                display inline-block
                font-size 12px
                color rgb(255,153,0)
                line-height 18px            
            .deliveryTime
                .time
                    display inline-block
                    margin-left 12px
                    font-size 12px
                    color rgb(147,153,159)
                    line-height 18px
    .comment
        margin-top 16px
        min-height 450px
        
</style>
