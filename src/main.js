import Vue from 'vue'
import App from './App.vue'
import store from './store';
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.productionTip = false;

import start from '@/components/Start';
import numberOfPlayers from '@/components/NumberOfPlayers';
import playerCustomizer from '@/components/PlayerCustomizer';
import rules from '@/components/Rules';
import board from '@/components/Board';

const routes = [
  { path: '/', component: start },
	{ path: '/setup/players', component: numberOfPlayers },
	{ path: '/setup/:player', component: playerCustomizer, props: (route) => ({player: +route.params.player}) },
	{ path: '/rules', component: rules },
	{ path: '/game', component: board }
]

const router = new VueRouter({
  routes
})

new Vue({
	render: h => h(App),
	store,
	router
}).$mount('#app')
