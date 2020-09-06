<template>
    <div class="topBar">
        <h2>Cargo Planner</h2>
            <label class="topBar__search search">
                <span class="search__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z"/>
                    </svg>
                </span>
                <input @input="search" type="text" placeholder="Search">
            </label>
        <div class="topBar__tools tools">
            <div class="tools__item tools__item--help">
                <btn  title="Load" v-on:method="load"></btn>
                <img src="dist/img/arrow.png" class="tools__help-arrow">
            </div>
            <btn class="tools__item" title="Save" v-on:method="save"></btn>
        </div>
    </div>
</template>
<script>
    import btn from "./button.vue";
    export default {
        components:{
            btn
        },
        data(){
            return {
                url:'https://jsonbox.io/box_6b92f61b9afc71686ece',
            }
        },
        mounted(){

        },
        created(){
        },
        methods:{
            load(){
                fetch(
                    this.url,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        this.$parent.allShips = data;
                        if(document.body.classList.contains('download')) {
                            document.body.classList.remove('download')
                        }
                    })
                    .catch( error=>{
                    console.error('Ошибка:', error);
                })
            },
            save(){
                window.localStorage.setItem('allShips',JSON.stringify(this.$parent.allShips));
            },
            search(event){
                let outputArr = [];
                let searchText = event.target.value.toLowerCase();
                for(let i = 0,l = this.allShips.length;i < l; i++){
                    if(this.allShips[i].name.toLowerCase().match(searchText)){
                        outputArr.push(this.allShips[i]);
                    }
                }
                this.$parent.currentList = outputArr
            }
        },
        computed:{
            allShips:function () {
                return this.$parent.allShips;
            }
        }
    }
</script>
