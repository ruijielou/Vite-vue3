# Vue 3 + Typescript + Vite

## init Vite

- 用 [vitejs](https://vitejs.cn/) 初始化项目结构，至于为什么选 Vite，可以到官网了解一下；在这里我选择了 yarn 作为包管理工具，习惯也好，当然更好的选择应该是 pnpm, 其他方式可以看官方文档介绍

```bash
# yarn
yarn create vite my-vue-app --template vue

# 安装依赖
$ yarn install
# 或者使用 npm
$ npm install

# 启动开发服务器
$ yarn dev
```

## install package

- [vue-router](https://router.vuejs.org/)
- [todomvc-app-css](https://github.com/tastejs/todomvc-app-css)
- [todomvc-common](https://github.com/tastejs/todomvc-common)

> 引入了 TodoMVC 的 css,todo 的状态我用了路由的状态,所以引入了 vue-router，当然也可以用 vuex 之类的状态来代替

## 组件状态

- 组件状态和 vue2 有些差别，比如生命周期函数添加 on，引入式使用，不像 vue2 直接在 vue 组件内就可以随意使用
- 数据状态要用 ref 和 reactive 来声明响应式属性，ref 用来生命基本类型，比如 boolean, string, number; reactive 用来声明复杂数据类型。ref 声明的数据访问的时候要加 xxx.value，而 reactive 声明的数据访问的时候可以正常使用，并且不能直接覆盖数据为其重新赋值，这样就失去了响应式。

```javascript
//arr 改变的时候我用了push，数组的操作方法，清空的时候直接用了arr.length = 0;
const todolist = reactive<todoItem[]>([]);

//change it

todolist.length = 0;

//or
const item = {...}
todolist.push({...item})

```

- 父子组件的传值用 defineProps 在子组件获取父组件传过来的值

```javascript
defineProps<{ todo: ItemInterFace | null; editedTodoId: number }>();
```

- 子组件使用父组件事件 defineEmits 在子组件获取父组件的事件，才可以调用

```javascript
const emit = defineEmits(["changeId", "editTodos", "deleteItem"]); //定义

//调用
const editTodo = (todo: ItemInterFace) => {
  emit("editTodos", todo);
};
```

> 用 setup 语法糖的方式不用写 steup 函数，组件也不用再手动注册，组件状态和方法可以用 defineProps、defineEmits、defineExpose，并且 vue3.0 支持我们的组件内部可以不用再写顶级 dom，省去一个 div 的 感觉非常好
