import Vuex from 'vuex'
import axios from 'axios'
export const store = new Vuex.Store({
    mutations: {
        async updateUsers(state, users) {
            // console.log("2. Updating users...");
            await axios.get(state.apiUrl + '/users')
                .then(response => {
                    // console.log("response: ", response.data);
                    users = response.data;
                })
                .catch(error => {   
                    console.error("Error fetching users:", error);
                });
            state.users = users;
        }
    }
})