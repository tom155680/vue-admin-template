import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'


//tinymce
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'

Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
Vue.use(VueTinymce)              // 安装vue的tinymce组件

import '@/icons' // icon
import '@/permission' // permission control
import { hasBtnPermission } from './utils/permission' // button permission

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.prototype.hasPerm = hasBtnPermission

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
