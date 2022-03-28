<script setup lang="ts">
import { ItemInterFace } from "../interface";
import { ref } from "vue";

defineProps<{ todo: ItemInterFace | null; editedTodoId: number }>();
const emit = defineEmits(["changeId", "editTodos", "deleteItem"]);

const editThis = (id: number) => {
  emit("changeId", id);
};
const editTodo = (todo: ItemInterFace) => {
  emit("editTodos", todo);
};
const deleteItems = (todo: ItemInterFace) => {
  emit("deleteItem", todo);
};
</script>
<template>
  <li class="todo" :class="{completed: todo.completed, editing: todo.id == editedTodoId}">
    <div class="view">
      <input class="toggle" v-model="todo.completed" @change="editTodo(todo)" type="checkbox">
      <label @dblclick="editThis(todo.id)">{{todo.title}}</label>
      <button class="destroy" @click="deleteItems(todo)"></button>
    </div>
    <input class="edit" v-model="todo.title" @blur="editTodo(todo)" v-todo-focus="todo.id == editedTodoId"
      @keyup.enter="editTodo(todo)">
  </li>
</template>