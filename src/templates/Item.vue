<template>
    <div class="item">
        <div v-if='!loading' class="item__wrap">
            <h3 class="item__title">{{curShip.name}}</h3>
            <p class="item__email">Email: <a :href="'mailto:'+(curShip.email)">{{curShip.email}}</a></p>
            <p class="item__count">Number of required cargo bays <strong>{{bayAmount}}</strong></p>
            <div class="item__box">
                <p >Cargo boxes</p>
                <input v-on:keydown="validateFigure" @change="newValue" type="text" :value="curShip.boxes">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components:{
        },
        props:{
            Ship: Object
        },
        data(){
            return {
                noEmail: 'no email',
                curShip: this.Ship,
                loading: true
            }
        },
        mounted(){
            if(!this.Ship){
                this.curShip = this.findShip('name',this.name);
                this.loading = false;
            }
        },
        methods:{
            calculateBay(val){
                if(val.length <= 0 ){
                    return
                }
                let nameArr = val.split(',');
                let Amount = 0;
                nameArr.forEach(item=>{
                    Amount += +item;
                });
                return Math.ceil(Amount/10);
            },
            validateFigure(event){
                if((/^[a-zA-Z\!@#\$\%\^\&\\\}\]\|]$/.test(event.key))){
                    event.preventDefault();
                }
            },
            newValue(event){
                let valueString = event.target.value;
                let shipInArr = this.findShip('id',this.curShip.id);
                this.curShip.boxes = valueString;
                this.calculateBay(valueString);
                shipInArr = this.curShip;
            },
            findShip(selector,selectorValue){
                let availableSelectors = ['id','name'];
                if(!availableSelectors.some(el=> el === selector)) {
                    return console.error('From findShip(fun): use available selector: '+availableSelectors.join(' || '));
                }
                for(let i = 0,l = this.allShips.length; i < l ;i++){
                    if(this.allShips[i][selector] === selectorValue){
                        return this.allShips[i];
                    }
                }
            }
        },
        computed:{
            bayAmount: function () {
                return this.calculateBay( this.curShip.boxes);
            },
            name: function () {
                let nameReg = new RegExp('(?!\\/)[\\w\\s\\d-]*$','g');
                return this.$route.path.match(nameReg)[0];
            },
            allShips: function () {
                return this.$parent.allShips
            }
        },
        watch:{
            Ship: {
                immediate:false,
                handler(val){
                    this.curShip = val;
                }

            },
        }

    }
</script>
