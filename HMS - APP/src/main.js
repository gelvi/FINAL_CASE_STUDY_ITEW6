import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

//the app.use() method is used to register components or plugins globally
const app = createApp(App);
app.use(store);
app.use(router);
app.use(bootstrap);
app.mount('#app'); //mount the app to the DOM


