<template>
    <div class="item">
        <div class="item__wrap">
            <h3 class="item__title">{{Ship.name || 'no information'}}</h3>
            <p class="item__email">Email: <a :href="'mailto:'+(Ship.email || 'no info')">{{Ship.email || this.noEmail}}</a></p>
            <p class="item__count">Number of required cargo bays <strong>{{bayAmount}}</strong></p>
            <div class="item__box">
                <p >Cargo boxes</p>
                <input v-on:keydown="validateFigure" @change="newValue" type="text" :value="Ship.boxes"><!---->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components:{
        },
        nameItem: 'Item',
        props:{
            Ship: Object
        },
        data(){
            return {
                noEmail: 'no email',
                curShip: this.Ship || {name:23,email:32,boxes:23}
            }
        },
        mounted(){

        },
        created(){

        },
        methods:{
            calculateBay(val){
                console.log(val);
                if(val.length <= 0 ){
                    return
                }
                if(typeof val !== 'string'){
                    val = val.target.value;
                }
                let nameArr = val.split(',');
                let Amount = 0;
                nameArr.forEach(item=>{
                    Amount += +item;
                });
                // this.bayAmount = Math.ceil(Amount/10);
                return Math.ceil(Amount/10);
            },
            validateFigure(event){
                if((/^[a-zA-Z\!@#\$\%\^\&\\\}\]\|]$/.test(event.key))){
                    event.preventDefault();
                }
            },
            newValue(event){
                let valueString = event.target.value;
                let shipInArr =  this.findShip('id',this.Ship.id);
                this.Ship.boxes = valueString;
                this.calculateBay(valueString);
                shipInArr = this.Ship;
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
                return this.calculateBay( this.Ship.boxes);
            },
            name: function () {
                let nameReg = new RegExp('(?!\\/)[\\w\\s\\d-@#]*$','g');
                return this.$route.path.match(nameReg)[0];
            },
            allShips: function () {
                return this.$parent.allShips
            },

        },
        watch:{
            Ship: {
                immediate:false,
                handler(val){
                    this.curShip = val;
                }

            },
            allShips:{
                immediate:false,
                handler(val){
                    this.Ship = this.findShip('name',this.name);
                }
            }
        }

    }
</script>
