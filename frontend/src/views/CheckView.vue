<template>
  <div class="checkout-view">
    <BLSum :cart="cart" @remove-from-cart="removeFromCart" />
  </div>
</template>

<script>
import { inject } from 'vue';
import BLSum from '@/components/BLSum.vue';

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