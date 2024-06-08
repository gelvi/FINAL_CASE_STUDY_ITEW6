// import Vue from 'vue'
import Vuex from 'vuex'
// import authModule from './modules/auth'
import userModule from './modules/user'
import productModule from './modules/product'

// Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        post: productModule,
        user: userModule,
    },
})