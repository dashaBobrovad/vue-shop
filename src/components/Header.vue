<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  cartSum: Number,
});

defineEmits(['openDrawer']);
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-11" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li
        class="flex cursor-pointer items-center gap-3 text-gray-500 hover:text-black"
        @click="$emit('openDrawer')"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ cartSum }} руб.</b>
      </li>
      <li
        class="flex cursor-pointer items-center gap-3 text-gray-500 hover:text-black"
      >
        <RouterLink to="/fav">
          <img src="/heart.svg" alt="Favorite" />
          <span>Закладки</span>
        </RouterLink>
      </li>
      <li
        class="flex cursor-pointer items-center gap-3 text-gray-500 hover:text-black"
      >
        <img src="/profile.svg" alt="Favorite" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>
