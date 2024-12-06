<template>
  <div id="app">
    <nav>
      <router-link to="/">Products</router-link> |
      <router-link to="/check">Checkout</router-link>
    </nav>
    <router-view/> <!-- 渲染匹配的路由组件 -->
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import { fetchProducts } from '@/modules/api';

export default {
  setup() {
    const cart = ref([]); 
    const allProducts = ref([]); 

    fetchProducts().then(products => {
      allProducts.value = products;
    }).catch(error => {
      console.error('Failed to fetch products:', error);
    });

    function addToCart(product) {
      const existingProductIndex = cart.value.findIndex(cartItem => cartItem._id === product._id);
      if (existingProductIndex > -1) {
        cart.value[existingProductIndex].quantity += 1;
      } else {
        cart.value.push({ ...product, quantity: 1 });
      }
    }

    function removeFromCart(index) {
      cart.value.splice(index, 1);
    }

    function clearCart() {
      cart.value = [];
    }

    provide('cart', cart);
    provide('addToCart', addToCart);
    provide('removeFromCart', removeFromCart);
    provide('clearCart', clearCart);
    provide('allProducts', allProducts);

    return {};
  },
};
</script>