<script setup>
import { RouterView } from 'vue-router';

import { ref, provide, computed } from 'vue';
import Drawer from './components/Drawer.vue';
import Header from './components/Header.vue';

/* Cart (START) */
const cart = ref([]);

const isDrawerOpen = ref(false);

const orderId = ref(null);

const cartSum = computed(() =>
  cart.value.length > 0
    ? cart.value.reduce((acc, item) => acc + item.price, 0)
    : 0,
);

const openDrawer = () => {
  isDrawerOpen.value = true;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
  orderId.value = null;
};

const toggleCartItem = (item) => {
  item.isAdded = !item.isAdded;

  if (item.isAdded) {
    cart.value.push(item);
  } else {
    cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id);
  }
};

provide('cart', {
  open: openDrawer,
  close: closeDrawer,
  list: cart,
  toggleCartItem,
});
/* Cart (END) */
</script>

<template>
  <Drawer
    v-if="isDrawerOpen"
    :cart-sum="cartSum"
    :order-id="orderId"
  />
  <div class="shadow-grey-200 m-auto mt-20 w-3/5 rounded-xl bg-white shadow-xl">
    <Header :cart-sum="cartSum" @open-drawer="openDrawer" />
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
