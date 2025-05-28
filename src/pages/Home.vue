<script setup>
import { onMounted, ref, watch, reactive } from 'vue';
import CardList from '../components/CardList.vue';
import Header from '../components/Header.vue';

const items = ref([]);

const filters = reactive({
  searchQuery: '',
  sortBy: '',
});

const fetchItems = async () => {
  try {
    const params = new URLSearchParams();

    if (filters.sortBy) {
      params.set('sortBy', filters.sortBy);
    }

    if (filters.searchQuery) {
      params.set('title', `*${filters.searchQuery}*`);
    }

    const query = params.toString();
    const url = `https://efe88dd61a59f406.mokky.dev/items${query ? `?${query}` : ''}`;

    const response = await fetch(url);
    const data = await response.json();

    items.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchItems);
watch(filters, fetchItems);
</script>

<template>
  <div class="shadow-grey-200 m-auto mt-20 w-3/5 rounded-xl bg-white shadow-xl">
    <Header />

    <div class="p-10">
      <div class="mb-10 flex items-center justify-between">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select
            v-model="filters.sortBy"
            class="rounded-md border border-gray-200 px-3 py-2 focus:border-gray-400 focus:outline-none"
          >
            <option value="" disabled selected>Select your option</option>
            <option value="title">По названию</option>
            <option value="-price">По цене (дешевые)</option>
            <option value="price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <input
              v-model="filters.searchQuery"
              type="text"
              class="rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-gray-400 focus:outline-none"
              placeholder="Поиск..."
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <img src="/search.svg" />
            </div>
          </div>
        </div>
      </div>

      <CardList :items="items" />
    </div>
  </div>
</template>
