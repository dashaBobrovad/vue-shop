<script setup>
import { onMounted, ref } from 'vue';

const favorites = ref([]);

onMounted(async () => {
  try {
    const url = 'https://efe88dd61a59f406.mokky.dev/favorite/';

    const response = await fetch(url);
    const data = await response.json();

    favorites.value = data;
  } catch (error) {
    console.error(error);
  }
});
</script>
<template><div>fav</div></template>
