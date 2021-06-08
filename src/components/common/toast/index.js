import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2. 创建一个组件对象
  const toast = new toastConstructor()
  // 3. 将组件对象手动挂载到某一个div元素上
  toast.$mount(document.createElement('div'))
  // 4. 将挂载到的div元素添加到body中
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj


