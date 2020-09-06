import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./templates/home.vue";
import Item from "./templates/Item.vue";

Vue.use(VueRouter);
const routes = [
    {path: '/', component: Home},
    { path: '/item/:id',
        name: 'Item',
        component: Item,
        props: true

    }
];
const router = new VueRouter({
    routes
});
export default router;
