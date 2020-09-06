<template>
    <div class="sidebar">
        <router-link class="sidebar__link" v-for="ship in currentList" :to="{
        name:'Item',
        path:'item/',
        params:{
            id: ship.name,
            Ship:ship,
            key: ship.id
        },
        }">{{ship.name}}</router-link>
    </div>
</template>
<script>
    export default {
        components:{

        },
        props:{
            Ships:Array,
            CurrentList: Array,
        },
        data(){
            return {
                url:'https://jsonbox.io/box_6b92f61b9afc71686ece',
                allShips: this.$parent.Ships,
                currentShip: '',
                currentList: null
            }
        },
        mounted(){

        },
        created(){

        },
        methods:{

        },
        watch: {
            Ships: {
                immediate:false,
                handler(val){
                }

            },
            CurrentList:{
                immediate:false,
                handler(val){
                    this.currentList = val;
                }
            }
        }

    }
</script>
