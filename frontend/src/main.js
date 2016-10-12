import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store/store'

Vue.use(VueResource);

new Vue({
	store,
	el: '#app',
	render: h => h(App)
})
