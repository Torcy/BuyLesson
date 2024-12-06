<!-- ParentComponent.vue -->
<template>
  <div class="shopping-list">
    <h2>Goods List</h2>
    <SortControls :sort="toggleSort" />

    <SearchBox :searchResults="filterProducts" />

    <ul>
      <li v-for="product in filteredProducts" :key="product.id">
        <img :src="product.image" alt="image" class="product-image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="product-price">￥{{ product.price }}</p>
          <p class="product-quantity">Surplus quantity: {{ product.quantity }}</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue';
import SearchBox from './SearchBox.vue';
import SortControls from './SortControls.vue';

export default {
  components: {
    SearchBox,
    SortControls,
  },
  setup() {
    const allProducts = inject('allProducts');
    const addToCart = inject('addToCart');
    const searchQuery = ref('');
    const sortOrder = ref({ field: 'name', order: 'asc' });

    const filteredProducts = computed(() => {
      return allProducts.value
        .filter(product => {
          const searchLower = searchQuery.value.toLowerCase();
          const idString = product.id ? product.id.toString().toLowerCase() : '';
          const nameLower = product.name.toLowerCase();
          return nameLower.includes(searchLower) || idString.includes(searchLower);
        })
        .sort((a, b) => {
          if (sortOrder.value.field === 'name') {
            return sortOrder.value.order === 'asc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortOrder.value.field === 'price') {
            return sortOrder.value.order === 'asc'
              ? a.price - b.price
              : b.price - a.price;
          }
          return 0;
        });
    });

    const filterProducts = (query) => {
      searchQuery.value = query;
    };

    const toggleSort = (field, order) => {
      sortOrder.value = { field, order };
    };

    return {
      allProducts,
      addToCart,
      filteredProducts,
      filterProducts,
      toggleSort,
    };
  },
};
</script>

<style>
.product-image {
  width: 200px; 
  height: auto; 
  object-fit: cover; 
}
.product-quantity {
  color: #666;
  font-size: 14px;
}
</style>