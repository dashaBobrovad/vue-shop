<script setup>
import { onMounted, ref, watch, reactive, inject } from 'vue';
import CardList from '../components/CardList.vue';

const { list: cartList } = inject('cart');
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

    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      isAdded: false,
    }));
  } catch (error) {
    console.error(error);
  }
};

const fetchFavorites = async () => {
  try {
    const url = 'https://efe88dd61a59f406.mokky.dev/favorite/';

    const response = await fetch(url);
    const favoritesData = await response.json();

    items.value = items.value.map((item) => {
      const favorite = favoritesData.find(
        (favItem) => favItem.item_id === item.id,
      );

      if (!favorite) return item;

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

const addToFavorite = async (id) => {
  try {
    const url = 'https://efe88dd61a59f406.mokky.dev/favorite/';

    const item = items.value.find((item) => item.id === id);

    if (!item.isFavorite) {
      const obj = { item_id: id };

      item.isFavorite = true;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });

      const data = await response.json();
      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;

      await fetch(`${url}${item.favoriteId}/`, {
        method: 'DELETE',
      });

      item.favoriteId = undefined;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  cartList.value = JSON.parse(localStorage.getItem('cart')) || [];

  await fetchItems();
  await fetchFavorites();

  items.value = items.value.map((item) => {
    return {
      ...item,
      isAdded: !cartList.value.findIndex((cartItem) => cartItem.id === item.id),
    };
  });
});

watch(filters, fetchItems);

watch(cartList, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }));
});

watch(
  cartList,
  (val) => {
    localStorage.setItem('cart', JSON.stringify(val));
  },
  { deep: true },
);
</script>

<template>
  <div>
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

    <CardList :items="items" @add-to-favorite="addToFavorite" />
  </div>
</template>
