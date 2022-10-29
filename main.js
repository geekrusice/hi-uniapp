import App from './App'

// 引入uview
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'

// 引入拦截器
import router from '@/config/router.js'

// 挂载uview组件
Vue.use(uView)
// 挂载路由拦截插件
Vue.use(router)

//引入vuex 并且挂载到vue实例上
import store from "./store/index.js"
Vue.prototype.$store = store

// import VConsole from 'vconsole'
// const vConsole = new VConsole({ theme: 'dark' })

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
// 引入请求封装，将app参数传递到配置中
require('./config/request.js')(app)
app.$mount()