<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const { list: cartList, remove } = inject('cart');
</script>

<template>
  <div class="flex flex-1 flex-col justify-between">
    <div class="flex flex-col gap-5">
      <CartItem
        v-for="item of cartList"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :price="item.price"
        :img="item.imageUrl"
        @remove="remove(item.id)"
      />
    </div>

    <div>
      <div class="flex flex-col gap-5">
        <div class="flex items-end gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed" />
          <span class="font-bold">1000 руб.</span>
        </div>

        <div class="flex items-end gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed" />
          <span class="font-bold">50 руб.</span>
        </div>
      </div>

      <button
        disabled
        class="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-lime-500 py-3 text-white transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300"
      >
        Оформить заказ
        <img src="/arrow-next.svg" alt="Arrow" />
      </button>
    </div>
  </div>
</template>
