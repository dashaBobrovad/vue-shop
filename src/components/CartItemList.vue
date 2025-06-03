<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const { list: cartList, toggleCartItem } = inject('cart');
</script>

<template>
  <div class="flex flex-1 flex-col justify-between">
    <div v-auto-animate class="flex flex-col gap-5">
      <CartItem
        v-for="item of cartList"
        :id="item.id"
        :key="item.id"
        :title="item.title"
        :price="item.price"
        :img="item.imageUrl"
        @toggle-cart-item="toggleCartItem(item)"
      />
    </div>
  </div>
</template>
