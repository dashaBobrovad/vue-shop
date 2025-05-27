<script setup>
import { ref } from 'vue';

defineProps({
  title: String,
  img: String,
  price: Number,
});

const isLiked = ref(false);

const onClick = () => {
  isLiked.value = !isLiked.value;
};
</script>

<template>
  <div
    class="relative flex w-full cursor-pointer flex-col rounded-xl border border-slate-100 p-8 transition hover:-translate-y-2 hover:shadow-xl"
  >
    <div class="absolute left-8 top-8" @click="onClick">
      <img :src="isLiked ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" />
    </div>
    <img :src="img" class="w-full" alt="Sneaker" />
    <p>{{ title }}</p>
    <div class="mt-5 flex justify-between">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>
      <img src="/plus.svg" alt="Plus" />
    </div>
  </div>
</template>
