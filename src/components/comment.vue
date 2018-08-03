<template>
    <div id="comment">
        <div class="comment-header">
            <div class="satisfaction">
                <!-- 显示评价分类：全部， 满意， 不满意 -->
                <span class="all" :class="{active: isAll}" @click="toggleShowType(2, $event)">全部 {{allCount}}</span>
                <span class="satisfy" :class="{active: isSatisfy}" @click="toggleShowType(0, $event)">满意 {{positiveCount}}</span>
                <span class="dissatisfy" :class="{active: isDissatisfy}" @click="toggleShowType(1, $event)">不满意 {{negativeCount}}</span>
            </div>
            <div class="show-control">
                <span class="icon-check_circle" :class="{active: !hasEmpty}" @click="toggleEmpty"></span>
                <span class="text">只看有内容的评价</span>   
            </div>
        </div>
        <!-- 评论展示区 -->
        <div class="content">
            <!-- 用户评价 -->
            <div class="comment-item" v-for="(item, index) in ratings" :key="index" v-show="isCommentShow(item.rateType, item.text)" :class="{'last-child': index === lastShowIndex}">
                <div class="avatar">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="detail">
                    <div class="account-info clearfix">
                        <span class="username">{{item.username}}</span>
                        <span class="comment-time">{{commentTime(item.rateTime)}}</span>
                    </div>
                    <div class="score">
                        <div class="star">
                            <span class="star-item star-on" v-for="n in item.score" :key="n"></span>
                            <span class="star-item star-off" v-for="n in (5 - item.score)" :key="item.score + n"></span>
                        </div>
                        <div class="deliveryTime" v-if="item.deliveryTime">
                            {{item.deliveryTime}}分钟送达
                        </div>
                    </div>
                    <div class="text">
                        {{item.text}}
                    </div>
                    <div class="tags">
                        <span class="thumb" :class="rateTypeClass[item.rateType]"></span>
                        <span class="recommend" v-for="(foodName, index) in item.recommend" :key="index">{{ foodName }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ratings: {
            type: Array
        }
    },
    data() {
        return {
            showType: 2,
            hasEmpty: true,
            rateTypeClass: ['icon-thumb_up', 'icon-thumb_down'],
            isShow: true,
            lastChildIndex: 0,
            lastPositiveIndex: 0,
            lastNegativeIndex: 0,
            lastShowIndex: 0 //最后显示的评论元素的索引
        }
    },
    methods: {
        commentTime(timeStamp) {
            let date = new Date(timeStamp);
            let subDate =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            let subTime = `${date.getHours()}:${date.getMinutes()}`;
            return `${subDate} ${subTime}`;
        },
        toggleEmpty(event) {
            if(event._constructed) {
                this.hasEmpty = !this.hasEmpty;
            }
        },
        isCommentShow(rateType, text) {
            let flag = true;
            if(!this.hasEmpty) {
                if(!text) {
                    flag = false;
                }
            }
            if(this.showType != 2 && this.showType != rateType) {
                flag = false;
            }
            return flag;
        },
        toggleShowType(type, event) {
            if(event._constructed) {
                this.showType = type;
                switch (type) {
                    case 0:  // 满意
                        this.lastShowIndex = this.lastPositiveIndex;
                        break;
                    case 1:  // 不满意
                        this.lastShowIndex = this.lastNegativeIndex;
                        break;
                    case 2: // 全部
                        this.lastShowIndex = this.lastChildIndex;
                        break;
                    default:
                        this.lastShowIndex = this.lastChildIndex;
                        break;
                }
            }
        }
    },
    computed: {
        isAll() {
            if(this.showType === 2) {
                return true;
            }else {
                return false;
            }
        },
        isSatisfy() {
            if(this.showType === 0) {
                return true;
            }else {
                return false;
            }
        },
        isDissatisfy() {
            if(this.showType === 1) {
                return true;
            }else {
                return false;
            }
        },
        allCount() {
            let lastIndex = 0;
            let newArr = this.ratings.filter((item,index) => {
                if(item.score >= 0) {
                    lastIndex = index;
                    return true;
                }
            })
            this.lastChildIndex = lastIndex;
            this.lastShowIndex = lastIndex;
            return newArr.length;
        },
        positiveCount() {
            let lastIndex = 0;
            let newArr = this.ratings.filter((item,index) => {
                if(item.rateType === 0) {
                    lastIndex = index;
                    return true;
                }
            })
            this.lastPositiveIndex = lastIndex;
            return newArr.length;
        },
        negativeCount() {
            let lastIndex = 0;
            let newArr = this.ratings.filter((item,index) => {
                if(item.rateType === 1) {
                    lastIndex = index;
                    return true;
                }
            })
            this.lastNegativeIndex = lastIndex;
            return newArr.length;
        }
    }
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
@import '../../static/style.css'

#comment
    border-1px-top rgba(7,17,27,0.1)
    background #fff
    .comment-header
        .satisfaction
            margin 0 18px
            padding 18px 0
            border-1px rgba(7,17,27,0.1)
            font-weight normal 
            span 
                display inline-block
                padding 8px 12px
                margin-right 8px
                font-size 12px
                line-height 16px
                color #4d555d
                &.active
                    color #fff
            .all,.satisfy
                background rgba(0,160,220,0.2)
                &.active
                    background rgb(0,160,220)
            .dissatisfy
                background rgba(77,85,93,0.2)
                &.active
                    background rgb(77,85,93)
        .show-control
            padding 12px 18px
            font-size 0
            color #93999f
            line-height 24px
            border-1px rgba(7,17,27,0.1)
            .icon-check_circle
                display inline-block
                font-size 24px
                margin-right 4px
                vertical-align top
                &.active
                    color #00c850
            .text
                display inline-block
                font-size 12px
                vertical-align top
    .content
        .comment-item
            position relative
            padding 18px 0
            margin 0 18px
            border-1px rgba(7,17,27,0.1)
            &.last-child
                border-1px #fff
            .avatar
                position absolute 
                top 18px
                left 0
                width 28px
                height 28px
                border-radius 50%
                overflow hidden
                img 
                    width 100%
            .detail
                margin-left 40px
                .account-info
                    display block
                    font-size 10px
                    line-height 12px
                    .username
                        float left
                        color rgb(7,17,27)
                    .comment-time
                        float right 
                        color rgb(147,153,159)
                .score
                    margin-top 4px
                    font-size 0
                    color rgb(147,153,159)
                    line-height 12px
                    .star
                        display inline-block
                        font-size 0
                        line-height 12px
                        vertical-align top
                        .star-item
                            display inline-block
                            width 10px
                            height 10px
                            margin-right 3px
                            background-size 100% 100%
                            &:last-child
                                margin-right 0
                            &.star-on
                                bg-image 'star24_on'
                            &.star-off
                                bg-image 'star24_off'
                    .deliveryTime
                            display inline-block
                            margin-left 6px
                            font-size 10px
                            color rgb(147,153,159)
                .text
                    margin-top 6px
                    font-size 12px
                    color rgb(7,17,27)
                    line-height 18px
                    font-weight normal
                .tags
                    margin-top 8px
                    line-height 16px
                    vertical-align bottom
                    font-size 0
                    .thumb
                        font-size 12px
                        margin-right 8px
                        &.icon-thumb_up
                            color rgb(0,160,220)
                        &.icon-thumb_down
                            color rgb(183,187,191)
                    .recommend
                        display inline-block
                        padding 0 6px
                        margin-right 8px
                        font-size 9px
                        color rgb(147,153,159)
                        line-height 16px
                        border 1px solid rgba(7,17,27,0.1)
                        border-radius 2px
                        background-color #fff
</style>
