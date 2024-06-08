import Vuex from 'vuex'
import axios from 'axios'
export const store = new Vuex.Store({
    mutations: {
        async updateProducts(state, products) {
            // console.log("2. Updating products...");
            await axios.get(state.apiUrl + '/products')
                .then(response => {
                    // console.log("response: ", response.data);
                    products = response.data;
                })
                .catch(error => {   
                    console.error("Error fetching products:", error);
                });
            state.products = products;
        }
    }
})