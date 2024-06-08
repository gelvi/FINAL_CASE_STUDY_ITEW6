import Vuex from 'vuex'
import axios from 'axios'

export const store = new Vuex.Store({
  name: 'store',
  state: {
    apiUrl: 'http://127.0.0.1:8000/api',
    products: [],
    product: [],
    users: [],
    user: [],
    searchQuery: '',
  },
  getters: {
    //this getter will return all of the products
    getProducts: state => {
      return axios.get(state.apiUrl + '/products')
        .then(response => {
            state.products = response.data; //store all products in the state
        })
        .catch(error => {   
            console.error("Error fetching products:", error);
        });
    },
     //this getter will return a single product and is triggered when the user clicks on a edit or delete products
    getProduct: (state) => (id) => {
      return axios.get(state.apiUrl + '/product/' + id)
        .then(response => {
            state.product = response.data; //store all products in the state
        })
        .catch(error => {   
          //handle error as needed

          alert(error.message)
      });
    },

    //==================== USER ===========================
    //this getter will return all of the users
    getUsers: state => {
      return axios.get(state.apiUrl + '/users')
        .then(response => {
            state.users = response.data; //store all users in the state
        })
        .catch(error => {   
            console.error("Error fetching users:", error);
        });
    },
    //this getter will return a single user and is triggered when the user clicks on a edit or delete user
    getUser: (state) => (id) => {
      return axios.get(state.apiUrl + '/user/' + id)
        .then(response => {
            state.user = response.data; //store all users in the state
        })
        .catch(error => {   
          //handle error as needed

          alert(error.message)
      });
    },
    
  },
  mutations: {
    //==================== PRODUCT ===========================
    async refreshProduct(state, products) {
      // this mutation will refresh the posts that display on the page
      // its triggered every time the user adds, edits, or deletes a post
      await axios.get(state.apiUrl + '/products')
          .then(response => {
            products = response.data;
          })
          .catch(error => {   
              alert(error.message)
          });
      state.products = products;
    },
    async filteredProducts(state, searchQuery) {
        await axios.get(state.apiUrl + '/searchproduct/' + searchQuery)
            .then(response => {
                state.products = response.data; //store all products in the state that match the searchQuery
            })
            .catch(error => {   
                alert(error.message)
                state.products= []; //reset the state if an error occurs
            });
        // state.products = products;
    },
    updateName(state, name) {
      state.product.name = name; //update the product title 
    },
    updateDescription (state, description) {
        state.product.description = description; //update the product content
    },
    updatePrice (state, price) {
      state.product.price = price; //update the product content
    },

  //==================== USER ===========================
  async refreshUsers(state, users) {
    // this mutation will refresh the users that display on the page
    // its triggered every time the user adds, edits, or deletes a user
    await axios.get(state.apiUrl + '/users')
        .then(response => {
          users = response.data;
        })
        .catch(error => {   
            alert(error.message)
        });
    state.users = users;
  },
  async filteredUsers(state, searchQuery) {
      await axios.get(state.apiUrl + '/searchuser/' + searchQuery)
          .then(response => {
              state.users = response.data; //store all users in the state that match the searchQuery
          })
          .catch(error => {   
              alert(error.message)
              state.users= []; //reset the state if an error occurs
          });
      // state.products = products;
  },
  updateUserName(state, name) {
    state.user.name = name; //update the user name 
  },
  updateUserEmail (state, email) {
      state.user.email = email; //update the user email
  },
  // updateUserPassword (state, password) {
  //   state.user.password = password; //update the product content
  // }
  },
  actions: {
    //==================== PRODUCT ===========================
    refreshProduct({ commit }) {
      commit('refreshProduct'); //call the refreshProduct mutation
    },
    updateName({ commit }, name) {
        commit('updateName', name); //call the updateName mutation and pass in the name
    },
    updateDescription({ commit }, description) {
        commit('updateDescription', description); //call the updateDescription mutation and pass in the description
    },
    updatePrice({ commit }, price) {
      commit('updatePrice', price); //call the updatePrice mutation and pass in the price
    },
    filteredProducts({ commit }, searchQuery) {
      if (searchQuery === '') {
          commit('refreshProduct'); //call the refreshProduct mutation if the searchQuery is empty
      }else{
          commit('filteredProducts', searchQuery); //call the filteredProducts mutation and pass in the searchQuery
      }
    },
    //==================== USER ===========================
    refreshUsers({ commit }) {
      commit('refreshUsers'); //call the refreshProduct mutation
    },
    updateUserName({ commit }, name) {
        commit('updateUserName', name); //call the updateUserName mutation and pass in the name
    },
    updateUserEmail({ commit }, email) {
        commit('updateUserEmail', email); //call the updateUserEmail mutation and pass in the email
    },
    // updateUserPassword({ commit }, password) {
    //   commit('updateUserPassword', password); //call the updateUserPassword mutation and pass in the password
    // },
    filteredUsers({ commit }, searchQuery) {
      if (searchQuery === '') {
          commit('refreshUsers'); //call the refreshProduct mutation if the searchQuery is empty
      }else{
          commit('filteredUsers', searchQuery); //call the filteredProducts mutation and pass in the searchQuery
      }
    }
  }
})