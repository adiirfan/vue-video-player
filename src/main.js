import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './registerServiceWorker'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        mobile: 576,
        tablet: 900,
        laptop: 1250,
        desktop: Infinity,
    }
})

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)

new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app')
