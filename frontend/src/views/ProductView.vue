<template>
  <div class="products-view">
    <BLGoodslist />
  </div>
</template>

<script>
import BLGoodslist from '@/components/BLGoodslist.vue';
import { inject } from 'vue';

export default {
  components: {
    BLGoodslist,
  },
  setup() {
    const cart = inject('cart');
    const allProducts = inject('allProducts');
    const addToCart = inject('addToCart');

    return {
      cart,
      allProducts,
      addToCart,
    };
  },
};
</script>

<style scoped>
/* 商品列表页面的样式 */
</style>