<template>
    <div>
        <button class="button" type="button" v-on:click="$emit('method')">{{title || 'empty button'}}</button>
    </div>
</template>
<script>
    export default {
        components:{

        },
        props:{
            title: String
        },
        data(){
            return {
            }
        },
        mounted(){
        },
        created(){
        },
        methods:{
        },

    }
</script>
