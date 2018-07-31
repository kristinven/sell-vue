<template>
    <div id="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand bg-img"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="desc">
                    {{seller.description}} / {{seller.deliveryTime}}分钟送达
                </div>
                <div class="supports" v-if="seller.supports.length > 0">
                    <span class="icon bg-img" :class="classType[seller.supports[0].type]"></span>
                    <span class="description">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="num-wrapper" v-if="seller.supports.length > 0">
                <span class="num">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-icon bg-img"></span>
            <span class="bulletin">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            classType: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'

    #header
        position relative
        width 100%
        overflow hidden
        background rgba(7,17,27,0.5)
        .content-wrapper
            position relative
            padding 24px 24px 18px
            .avatar
                position absolute 
                top 24px
                left 24px
                width 64px
                height 64px
                border-radius 2px
                overflow hidden
                img 
                    set-img(64px)
            .content
                margin-left 80px
                margin-top 2px 
                margin-bottom 2px 
                .title
                    font-size 0
                    .brand
                        display inline-block
                        width 30px
                        height 18px
                        bg-image('brand')
                        background-size 100% 100%
                        vertical-align top
                    .name
                        font-size 16px
                        color rgb(255,255,255)
                        font-weight bold
                        line-height 18px
                        margin-left 6px
                .desc
                    margin-top 8px
                    font-size 12px
                    color rgb(255,255,255)
                    font-weight 200
                    line-height 12px
                .supports
                    margin-top 10px
                    font-size 0
                    .icon
                        display inline-block
                        width 12px
                        height 12px
                        background-size 100% 100%
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
                        margin-left 4px
                        font-size 10px
                        color rgb(255,255,255)
                        font-weight 200
                        line-height 12px
            .num-wrapper
                position absolute 
                right 12px
                bottom 14px
                padding 7px 8px
                border-radius 12px
                background rgba(0,0,0,0.2)
                font-size 10px
                color rgb(255,255,255)
                font-weight 200
                line-height 10px
        .bulletin-wrapper
            position relative
            height 28px
            padding-left 12px
            padding-right 20px
            background rgba(7,17,27,0.2)
            font-size 10px
            line-height 28px
            color rgb(255,255,255)
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            .bulletin-icon
                display inline-block
                width 22px
                height 12px
                bg-image('bulletin')
                background-size 100% 100%
                vertical-align middle
            .bulletin
                margin-left 4px
                margin-right 4px
            .icon-keyboard_arrow_right
                position absolute 
                right 12px
                bottom 8px
        .background
            position absolute 
            top 0
            left 0
            width 100%
            height 100%
            z-index -1
            img 
                width 100%
                filter blur(10px)

                                
                



</style>
