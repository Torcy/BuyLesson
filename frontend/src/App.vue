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
  name: 'App',
  setup() {
    const cart = ref([]); // 使用ref创建响应式数组
    const allProducts = ref([]); // 存储所有商品的响应式数组

    fetchProducts().then(products => {
      allProducts.value = products;
    }).catch(error => {
      console.error('Failed to fetch products:', error);
    });

    function addToCart(product) {
      const existingProductIndex = cart.value.findIndex(cartItem => cartItem.id === product.id);
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

    // 提供响应式数据和方法
    provide('cart', cart);
    provide('addToCart', addToCart);
    provide('removeFromCart', removeFromCart);
    provide('clearCart', clearCart);
    provide('allProducts', allProducts);

    return {};
  },
};
</script>

<script>
</script>