import Vuex from 'vuex'
export const store = new Vuex.Store({
    actions: {
        updateProducts({ commit }) {
            // console.log("1. Updating posts...");
            commit('updateProducts');
        }
    }
})