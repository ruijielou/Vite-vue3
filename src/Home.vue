<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useRoute } from "vue-router";
import Footer from "./components/Footer.vue";
import TodoItem from "./components/todoItem.vue";
import { reactive, ref, watch, onMounted } from "vue";
import { ItemInterFace } from "./interface";
import { setStorage, getStorage, deleteStorage, clearStorage } from "./storage";
const route: any = useRoute();
const visibility = ref<string>(route.name || "all");
const editedTodoId = ref<number>(0);
const todoList = reactive<ItemInterFace[]>([]);
const newTodo = reactive<ItemInterFace>({
  completed: false,
  title: "",
  id: Math.random(),
});
const addTodo = () => {
  todoList.push({ ...newTodo });
  setStorage({ ...newTodo });
  newTodo.title = "";
  newTodo.id = Math.random();
  initData(visibility.value);
};

const changeName = (name: string) => {
  visibility.value = name;
};

const changeId = (id: number) => {
  editedTodoId.value = id;
};
const editTodos = (todo: ItemInterFace) => {
  todoList.forEach((item: ItemInterFace) => {
    if (item.id == todo.id) {
      item = { ...todo };
      setStorage({ ...item });
      editedTodoId.value = 0;
    }
  });
};
const deleteItem = (todo: ItemInterFace) => {
  const lists = todoList.filter((item: ItemInterFace) => item.id !== todo.id);
  todoList.length = 0;
  lists.forEach((item: ItemInterFace) => {
    todoList.push({ ...item });
  });
  deleteStorage(todo.id);
};
const initData = async (newVal: string) => {
  let lists: ItemInterFace[] = await getStorage();

  if (newVal == "active") {
    lists = lists.filter((item) => item.completed == false);
  }
  if (newVal == "completed") {
    lists = lists.filter((item) => item.completed == true);
  }
  todoList.length = 0;
  lists.forEach((item) => {
    todoList.push({ ...item });
  });
};
const clearTodo = () => {
  todoList.length = 0;
  clearStorage();
};
watch(visibility, (newVal: string, oldVal: string) => {
  initData(newVal);
});
onMounted(() => {
  initData(visibility.value);
});
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" @keyup.enter="addTodo" v-model="newTodo.title" placeholder="What needs to be done?"
        autofocus>
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list" v-show="todoList.length">
        <template v-for="item in todoList">
          <TodoItem @changeId="changeId" v-if="item && item.id" @deleteItem="deleteItem" @editTodos="editTodos"
            :editedTodoId="editedTodoId" :todo="item" />

        </template>
      </ul>
    </section>
    <Footer @changeName="changeName" @clearTodo="clearTodo" :visibility="visibility"
      :remainingCount="todoList.length" />
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Credits:
      <a href="http://twitter.com/cburgdorf">Christoph Burgdorf</a>,
      <a href="http://ericbidelman.com">Eric Bidelman</a>,
      <a href="http://jacobmumm.com">Jacob Mumm</a> and
      <a href="http://blog.igorminar.com">Igor Minar</a>
    </p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>
