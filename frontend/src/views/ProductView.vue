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
    const allProducts = inject('allProducts');
    const addToCart = inject('addToCart');

    return {
      allProducts,
      addToCart,
    };
  },
};
</script>