<template>
    <div class="main">
        <topbar/>
        <div class="content">
            <Sidebar :Ships="allShips" :CurrentList="currentList"/>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import topbar from "./parts/topbar.vue";
    import Sidebar from "./parts/sidebar.vue";
    export default {
        components:{
            Sidebar,
            topbar
        },
        props:{

        },
        data(){
            return {
                url:'https://jsonbox.io/box_6b92f61b9afc71686ece',
                allShips: null,
                currentList: null
            }
        },
        mounted(){

        },
        created(){
            if(window.localStorage.allShips){
                this.allShips = JSON.parse(window.localStorage.getItem('allShips'));
            }else{
                document.body.classList += 'download';
            }
        },
        methods:{

        },
        watch:{
            allShips: {
                immediate:false,
                handler(val){
                    this.currentList = val;
                }

            }
        }

    }
</script>
