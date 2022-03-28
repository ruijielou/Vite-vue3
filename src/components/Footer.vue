<script lang="ts" setup>
defineProps<{ remainingCount: number; visibility: string }>();
const emit = defineEmits(["changeName", "clearTodo"]);
const editTodo = (name: string) => {
  emit("changeName", name);
};
const clearComplete = () => {
  emit("clearTodo", name);
};
</script>
<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{remainingCount}}</strong>
    </span>
    <ul class="filters">
      <li>
        <a :class="{selected: visibility == 'all'}" @click="editTodo('all')" href="#/">All</a>
      </li>
      <li>
        <a :class="{selected: visibility == 'active'}" @click="editTodo('active')" href="#/active">Active</a>
      </li>
      <li>
        <a :class="{selected: visibility == 'completed'}" @click="editTodo('completed')"
          href="#/completed">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clearComplete">Clear completed</button>
  </footer>
</template>