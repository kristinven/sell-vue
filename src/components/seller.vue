<template>
    <div id="seller">
        {{msg}}
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            msg: 'seller'
        }
    },
    created() {

    }
}
</script>

<style>

</style>
