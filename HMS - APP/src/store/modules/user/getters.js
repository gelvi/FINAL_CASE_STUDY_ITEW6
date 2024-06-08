import Vuex from 'vuex'
import axios from 'axios'
export const store = new Vuex.Store({
    name: 'store',
    getters:{
        getUsers: state => {
            return axios.get(state.apiUrl + '/users')
                .then(response => {
                    state.users = response.data;
                    // console.log("response: ", response.data);
                    return response.data;
                })
                .catch(error => {   
                    console.error("Error fetching products:", error);
                    return []; // or handle error as needed
                });
        },
    }
})