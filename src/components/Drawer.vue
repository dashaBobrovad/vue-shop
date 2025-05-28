<script setup>
import CartItemList from './CartItemList.vue';
import DrawerHead from './DrawerHead.vue';
</script>

<template>
  <div class="fixed top-0 z-10 size-full bg-black opacity-70" />
  <div
    class="fixed right-0 top-0 z-10 flex h-full w-96 flex-col justify-between bg-white px-10 py-7"
  >
    <DrawerHead />

    <CartItemList />
  </div>
</template>
