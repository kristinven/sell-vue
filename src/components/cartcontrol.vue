<template>
    <div id="cartcontrol">
        <span class="decrease icon-remove_circle_outline" @click="remove" v-show="food.count > 0"></span>
        <span class="num" v-show="food.count > 0">{{food.count}}</span>
        <span class="increase icon-add_circle" @click="add"></span>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return{
        }
    },
    methods: {
        add(event) {
            if(!event._constructed) {  // 过滤掉浏览器自带click事件
                return;
            }
            if(!this.food.count) {
                Vue.set(this.food, 'count', 0);
            }
            this.food.count ++;
        },
        remove(event) {
            if(!event._constructed) {   //同上
                return;
            }
            if(this.food.count > 0) {
                this.food.count --;
            }

        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../../static/style.css'
#cartcontrol
    font-size 0
    .decrease,.increase
        display inline-block
        padding 6px
        font-size 24px
        color rgb(0,160,220)
        line-height 24px
    .num
        display inline-block
        padding-top 6px
        width 12px
        height 24px
        font-size 10px
        line-height 24px
        color rgb(147,153,159)
        text-align center
        vertical-align top
</style>
