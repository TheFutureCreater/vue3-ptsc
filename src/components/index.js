// 通过插件的方式把components中的所组件都进行全局化注册
import CityBox from './CityBox/index.vue'
export const componentPlugin = {
  install(app) {
    // app.component('组件名字'，组件配置对象)
    app.component('CityBox', CityBox)
  }
}
