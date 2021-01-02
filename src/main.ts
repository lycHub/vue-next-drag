import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {key, store} from './store'
import installElementPlus from './plugins'
import './assets/styles/index.scss';
import Test from "./components/BasicLayout/Test.vue";

const app = createApp(App)
app.component('my-test', Test);
installElementPlus(app)
app.use(store, key).use(router).mount('#root')
