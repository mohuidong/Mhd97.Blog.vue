import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
//引入element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入自定义css stylus
import '@/assets/css/Mystyle_1.styl';
//引入vue-awesome-swiper
import VueAweSomeSwiper from 'vue-awesome-swiper'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import axios from "axios"
import './axios/index'
//引入animate.css
import animate from 'animate.css'

Vue.use(animate);
Vue.use(VueAweSomeSwiper);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$elementMessage = function (msg,t) {
    this.$message({
        message: msg,
        type: t
    })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
