import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/cesium/';

import "cesium/Build/Cesium/Widgets/widgets.css";
