<template>
  <div class="shopping-list">
    <h2>Goods List</h2>
    <ul>
      <li v-for="product in allProducts" :key="product.id">
        <img :src="product.image" alt="" class="product-image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="product-price">￥{{ product.price }}</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const allProducts = inject('allProducts');
    const addToCart = inject('addToCart');

    return {
      allProducts,
      addToCart,
    };
  },
};
</script>

<style scoped>
/* 商品列表的样式 */
</style>