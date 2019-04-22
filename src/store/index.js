import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        // 存储token
        access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : ''
    },

    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            state.access_token = user.access_token;
            localStorage.setItem('access_token', user.access_token);
        }
    }
});

export default store;