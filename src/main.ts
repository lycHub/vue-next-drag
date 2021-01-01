import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {key, store} from './store'
import installElementPlus from './plugins'
import './assets/styles/index.scss';

const app = createApp(App)
installElementPlus(app)
app.use(store, key).use(router).mount('#root')
