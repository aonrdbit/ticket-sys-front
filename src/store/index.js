import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        userId:localStorage.getItem("userId")?localStorage.getItem("userId"):'',
    },
    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            state.Authorization = user.Authorization;
            state.username=user.username;
            state.userId=user.userId;
            localStorage.setItem('Authorization', user.Authorization);
            localStorage.setItem('username', user.username);
            localStorage.setItem('userId', user.userId);
        }
    }
});

export default store;