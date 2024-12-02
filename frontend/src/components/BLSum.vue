<template>
  <div class="cart-checkout">
    <h2>Cart Summary</h2>
    <ul>
      <li v-for="(item, index) in cart" :key="item.id">
        {{ item.name }} - ￥{{ item.price }} x {{ item.quantity }}
        <button @click="removeFromCart(index)">Remove</button>
      </li>
    </ul>
    <div class="total-price">
      Total: ￥{{ totalPrice }}
    </div>
    <div class="input-group">
      <label for="address">Address:</label>
      <input type="text" id="address" v-model="userAddress" @input="validateForm">
    </div>
    <div class="input-group">
      <label for="contact">Telephone:</label>
      <input type="text" id="contact" v-model="userContact" @input="validateForm">
    </div>
    <button :disabled="!isFormValid" @click="submitOrder">Submit</button>
  </div>
</template>

<script>

export default {
  props: {
    cart: Array,
  },
  emits: ['remove-from-cart', 'clear-cart'],
  data() {
    return {
      userAddress: '',
      userContact: '',
      isFormValid: false,
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    removeFromCart(index) {
      this.$emit('remove-from-cart', index);
    },
    validateForm() {
      const addressRegex = /^[^\u4e00-\u9fa5]{0,20}([\u4e00-\u9fa5]{0,20}[\s\S]?)+$/;
      const contactRegex = /^[3-9]\d{9}$/;
      this.isFormValid = addressRegex.test(this.userAddress) && contactRegex.test(this.userContact);
    },
    submitOrder() {
      if (this.isFormValid) {
        this.$emit('clear-cart');
        alert('Order submitted successfully!');
      } else {
        alert('Please check your address and contact number format!');
      }
    },
  },
};
</script>

