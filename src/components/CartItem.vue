<script setup>
defineProps({
  img: String,
  title: String,
  price: Number,
  onClickDelete: Function,
});

defineEmits(['remove']);
</script>

<template>
  <div
    class="relative flex w-full gap-4 rounded-xl border border-slate-100 p-4"
  >
    <img :src="img" class="size-16" alt="Sneaker" />
    <div class="flex w-full flex-col">
      <p>{{ title }}</p>
      <div class="mt-5 flex justify-between">
        <span class="font-bold">{{ price }} руб.</span>
        <img
          @click="$emit('remove')"
          class="cursor-pointer opacity-30 transition hover:opacity-100"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>
