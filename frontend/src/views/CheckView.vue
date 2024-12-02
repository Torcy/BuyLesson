<template>
  <div class="checkout-view">
    <BLSum />
  </div>
</template>

<script>
import BLSum from '@/components/BLSum.vue';
import { inject } from 'vue';

export default {
  components: {
    BLSum,
  },
  setup() {
    const cart = inject('cart');
    const removeFromCart = inject('removeFromCart');
    const clearCart = inject('clearCart');

    return {
      cart,
      removeFromCart,
      clearCart,
    };
  },
};
</script>

