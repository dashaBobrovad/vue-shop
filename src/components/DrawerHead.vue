<script setup>
import { inject } from 'vue';

const { close: closeDrawer } = inject('cart');
</script>
<template>
  <h2 class="mb-10 flex items-center gap-5 text-2xl font-bold">
    <svg
      class="rotate-180 cursor-pointer opacity-30 transition hover:-translate-x-1 hover:opacity-100"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="closeDrawer()"
    >
      <path
        d="M1 7H14.7143"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    Корзина
  </h2>
</template>
