<template>
    <div id="bulletin" v-show="showFlag">
        <div class="header">
            <div class="name">{{seller.name}}</div>
            <div class="star star-48">
                <span class="star-item star-on" v-for="n in starOnCount" :key="n"></span>
                <span class="star-item star-half" v-for="n in starHalfCount" :key="n + starOnCount"></span>
                <span class="star-item star-off" v-for="n in starOffCount" :key="n + starOnCount + starHalfCount"></span>
            </div>
        </div>
        <div class="supports" v-if="seller.supports.length > 0">
            <div class="title">
                <span class="middle-line"></span>
                <span class="name">优惠信息</span>
                <span class="middle-line"></span>
            </div>
            <ul class="supports-list">
                <li class="list-item" v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="classType[item.type]"></span>
                    <span class="description">{{item.description}}</span>
                </li>
            </ul>
        </div>
        <div class="content">
            <div class="title">
                <span class="middle-line"></span>
                <span class="name">商家公告</span>
                <span class="middle-line"></span>
            </div>
            <div class="con">
                {{seller.bulletin}}               
            </div>
        </div>
        <div class="close" @click="close">
            <span class="icon-close"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        seller: {
            type: Object
        },
        showFlag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            classType: ['decrease','discount','special','invoice','guarantee'],
        }
    },
    computed: {
        starOnCount() {
            return Math.floor(this.seller.score) || 0;
        },
        starHalfCount() {
            return ((this.seller.score - this.starOnCount) >= 0.5) ? 1 : 0
        },
        starOffCount() {
            return (5 - this.starOnCount - this.starHalfCount) || 0;
        }
    },
    methods: {
        close() {
            this.$emit('showBulletin');
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
@import '../../static/style.css'

#bulletin
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(7,17,27,0.8)
    padding 0 36px
    z-index 9
    .title
        display flex
        margin 28px 0 24px
        .middle-line
            flex 1
            width 112px
            height 14px
            border-1px-middle rgba(255,255,255,0.2)
        .name
            flex-grow 0
            flex-shrink 0
            padding 0 12px
            font-size 14px
            font-weight 700
            color #ffffff
            line-height 14px
    .header
        text-align center
        padding-top 64px
        .name
            font-size 16px
            font-weight 700
            color #ffffff
            line-height 16px
        .star
            display line-block
            margin-top 16px
            font-size 0
            .star-item
                display inline-block
                width 20px
                height 20px
                margin-right 22px
                background-size 100% 100%
                &.star-on
                    bg-image 'star48_on'
                &.star-half
                    bg-image 'star48_half'
                &.star-off
                    bg-image 'star48_off'
                &:last-child
                    margin-right 0
    .supports
        .supports-list
            padding 0 12px
            .list-item
                margin-bottom 12px
                font-size 0
                &:last-child
                    margin-bottom 0
                .icon
                    display inline-block
                    width 16px
                    height 16px
                    background-size 100% 100%
                    margin-right 6px
                    vertical-align top
                    &.decrease
                        bg-image 'decrease_2'
                    &.discount  
                        bg-image 'discount_2'
                    &.special
                        bg-image 'special_2'
                    &.invoice
                        bg-image 'invoice_2'
                    &.guarantee
                        bg-image 'guarantee_2'
                .description
                    display inline-block
                    font-size 12px 
                    color #fff
                    line-height 16px
    .content
        .con
            padding 0 12px
            font-size 12px
            color #ffffff
            line-height 24px
    .close
        position absolute
        bottom 32px
        left 50%
        margin-left -16px
        font-size 32px
        color rgba(255,255,255,0.5)
                    

</style>
