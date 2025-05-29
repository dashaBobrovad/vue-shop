<script setup>
import Card from '../components/Card.vue';

defineProps({
  items: Array,
});
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <Card
      v-for="item of items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :img="item.imageUrl"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
