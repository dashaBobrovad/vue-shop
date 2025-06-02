<script setup>
import { inject } from 'vue';

defineProps({
  id: Number,
  title: String,
  img: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
});

defineEmits(['addToFavorite']);

const { toggleCartItem } = inject('cart');
</script>

<template>
  <div
    class="relative flex w-full cursor-pointer flex-col rounded-xl border border-slate-100 p-8 transition hover:-translate-y-2 hover:shadow-xl"
  >
    <div class="absolute left-8 top-8" @click="$emit('addToFavorite')">
      <img :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" />
    </div>
    <img :src="img" class="w-full" alt="Sneaker" />
    <p>{{ title }}</p>
    <div class="mt-5 flex justify-between">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>
      <img
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
        @click="toggleCartItem (id)"
      />
    </div>
  </div>
</template>
