import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue3 from 'bootstrap-vue-3'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'toastr/build/toastr.css';

createApp(App)
    .use(BootstrapVue3)
    .use(store)
    .use(router)
    .use(BootstrapIconsPlugin)
    .mount('#app')
