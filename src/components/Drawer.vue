<script setup>
import { computed, inject, ref } from 'vue';
import CartItemList from './CartItemList.vue';
import DrawerHead from './DrawerHead.vue';
import InfoBlock from './InfoBlock.vue';

const props = defineProps({
  cartSum: Number,
  orderId: Number,
  isCreatingOrder: Boolean,
});

const { list: cartList } = inject('cart');

const isCreatingOrder = ref(false);

const addToOrders = async () => {
  try {
    cartList.value = [];
    isCreatingOrder.value = true;

    const url = 'https://efe88dd61a59f406.mokky.dev/orders/';

    const body = {
      items: cartList.value,
      totalPrice: cartSum.value,
    };

    const obj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, obj);

    const data = await response.json();
    orderId.value = data.id;

    isCreatingOrder.value = false;
  } catch (error) {
    console.log(error);
  }
};

const tax = computed(() => Math.round((props.cartSum * 5) / 100));
</script>

<template>
  <div class="fixed top-0 z-10 size-full bg-black opacity-70" />
  <div
    class="fixed right-0 top-0 z-10 flex h-full w-96 flex-col justify-between bg-white px-10 py-7"
  >
    <DrawerHead />

    <div v-if="!cartSum" class="flex grow flex-col justify-center">
      <InfoBlock
        v-if="!orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-else
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else class="flex grow flex-col justify-between">
      <CartItemList :cart-sum="cartSum" :is-creating-order="isCreatingOrder" />

      <div>
        <div class="flex flex-col gap-5">
          <div class="flex items-end gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ cartSum }} руб.</span>
          </div>

          <div class="flex items-end gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ tax }} руб.</span>
          </div>
        </div>

        <button
          :disabled="!cartSum || isCreatingOrder"
          class="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-lime-500 py-3 text-white transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300"
          @click="addToOrders()"
        >
          {{ isCreatingOrder ? 'Заказ оформляется...' : 'Оформить заказ' }}
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>
