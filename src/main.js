import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/admin.scss'

import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import { getDicts } from '@/api/system/dict/data'
import { getConfigKey } from '@/api/system/config'
import { parseTime, resetForm, addDateRange, selectDictLabel, download } from '@/utils/costum'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
//客服引入
import Chat from 'jwchat';
/* 在 0.2.041 之前的版本需要引入 css */
// import 'jwchat/lib/JwChat.css';


import Pagination from '@/components/Pagination'
import ImageViewer from 'vue2-viewer'   
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
import Editor from '@tinymce/tinymce-vue'


//样式
import 'tinymce/skins/content/default/content.min.css'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'

//主题
import 'tinymce/themes/silver'

//插件
// import 'tinymce/plugins/link' //链接插件
 //import 'tinymce/plugins/image' //图片插件
// import 'tinymce/plugins/media' //媒体插件
// import 'tinymce/plugins/table' //表格插件
// import 'tinymce/plugins/lists' //列表插件
// import 'tinymce/plugins/quickbars' //快速栏插件
// import 'tinymce/plugins/fullscreen' //全屏插件


/**
 * 注：
 * 5.3.x版本需要额外引进图标，没有所有按钮就会显示not found
 */
import 'tinymce/icons/default/icons'


if (process.env.NODE_ENV === 'development') {
  const host = location.host
  const open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.indexOf('identistore.oss-cn-hongkong.aliyuncs.com') > -1) {
      url = url.replace('identistore.oss-cn-hongkong.aliyuncs.com:80', `${host}/ali-oss`)
    }
    return open.call(this, method, url)
  }
}

// Vue.prototype.$tinymce = tinymce
// Vue.use(VueTinymce)

// Vue.config.productionTip = false



Vue.use(preview)
//客服聊天
Vue.use(Chat)



// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download


// 全局组件挂载
Vue.component('Pagination', Pagination)


Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

Vue.use(permission)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.use(ImageViewer)      
Vue.use(Editor) 


// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
