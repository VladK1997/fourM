import './assets/style.scss';
import Vue from 'vue';
import App from './templates/App.vue';
import router from './router'



window.axios = require('axios');

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
