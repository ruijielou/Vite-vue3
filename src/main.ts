import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import "todomvc-common/base.css"
import "todomvc-app-css/index.css"
import App from './App.vue'
import Home from './Home.vue'

const routes: VueRouter.RouteRecordRaw[] = [
  { path: '/', component: Home, name: 'all' },
  { path: '/active', component: Home, name: 'active' },
  { path: '/completed', component: Home, name: 'completed' },
]

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(router).mount('#app');

app.directive(
  'todo-focus', function (el: HTMLBodyElement, binding: any) {
    if (binding.value) {
      console.log(binding, "bingding");

      el.focus();
    }
  }
)
