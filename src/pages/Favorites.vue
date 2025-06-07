<script setup>
import CardList from '../components/CardList.vue';
import { onMounted, ref } from 'vue';

const favorites = ref([]);

onMounted(async () => {
  try {
    const url = 'https://efe88dd61a59f406.mokky.dev/favorite/?_relations=items';

    const response = await fetch(url);
    const data = await response.json();

    favorites.value = data.map((item) => item.item);
  } catch (error) {
    console.error(error);
  }
});
</script>
<template>
  <div>
    <h1 class="mb-10 text-3xl font-bold">Избранное</h1>
    <CardList :items="favorites" is-disable-actions />
  </div>
</template>
