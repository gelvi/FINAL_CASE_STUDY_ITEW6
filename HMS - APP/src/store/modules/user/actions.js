import Vuex from 'vuex'
export const store = new Vuex.Store({
    actions: {
        updateUsers({ commit }) {
            // console.log("1. Updating posts...");
            commit('updateUsers');
        }
    }
})