<script setup>
import { inject } from 'vue';
import Card from '../components/Card.vue';

defineProps({
  items: Array,
});

defineEmits(['addToFavorite']);

const { toggleCartItem } = inject('cart');
</script>

<template>
  <div v-auto-animate class="grid grid-cols-4 gap-10">
    <Card
      v-for="item of items"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :img="item.imageUrl"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      @add-to-favorite="$emit('addToFavorite', item.id)"
      @toggle-cart-item="toggleCartItem(item)"
    />
  </div>
</template>
