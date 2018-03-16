// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import axios from 'axios'
Vue.use(MuseUI)
Vue.prototype.axios=axios

Vue.config.productionTip = false

// 引入socketio
import io from 'socket.io-client'
const socket=io('http://localhost:3000')
Vue.prototype.socket=socket

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
