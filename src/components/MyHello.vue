<!-- <script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script> -->

<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => count.value++;

// const updCount = (e) => (count.value = e.target.value);
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">click</button>
  <input @keyup.enter="increment" />
</template>
