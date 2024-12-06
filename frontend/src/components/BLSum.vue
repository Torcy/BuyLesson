<template>
  <div class="cart-checkout">
    <h2>Cart Summary</h2>
    <ul v-if="cart && cart.length">
      <li v-for="(item, index) in cart" :key="item.id">
        {{ item.name }} - ￥{{ item.price }} x {{ item.quantity }}
        <button @click="removeFromCart(index)">Remove</button>
      </li>
    </ul>
    <div class="total-price" v-if="cart && cart.length">
      Total: ￥{{ totalPrice }}
    </div>
    <div class="input-group">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="userName" @input="validateForm">
    </div>
    <div class="input-group">
      <label for="address">Address:</label>
      <input type="text" id="address" v-model="userAddress" @input="validateForm">
    </div>
    <div class="input-group">
      <label for="contact">Telephone:</label>
      <input type="text" id="contact" v-model="userContact" @input="validateForm">
    </div>
    <!-- 显示验证错误信息 -->
    <div v-if="!isFormValid && validationErrors.length" class="validation-errors">
      <p>Please correct the following errors:</p>
      <ul>
        <li v-for="error in validationErrors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <button :disabled="!isFormValid || !cart.length" @click="submitOrder">Submit</button>
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
      userName: '',
      userAddress: '',
      userContact: '',
      isFormValid: false,
      validationErrors: [], // 存储验证错误信息
    };
  },
  computed: {
    totalPrice() {
      return this.cart ? this.cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
    },
  },
  methods: {
    validateForm() {
      this.validationErrors = []; // 每次输入时清空错误信息

      // 验证名称
      if (!this.userName) {
        this.validationErrors.push('Name is required.');
      } else if (!/^[a-zA-Z\u4e00-\u9fa5]{1,20}$/.test(this.userName)) {
        this.validationErrors.push('Name must be 1-20 characters long and can only contain letters or Chinese characters.');
      }

      // 验证地址
      if (!this.userAddress) {
        this.validationErrors.push('Address is required.');
      } else if (!/^[^\u4e00-\u9fa5]{0,20}([\u4e00-\u9fa5]{0,20}[\s\S]?)+$/.test(this.userAddress)) {
        this.validationErrors.push('Invalid address format.');
      }

      // 验证联系电话
      if (!this.userContact) {
        this.validationErrors.push('Contact number is required.');
      } else if (!/^[1-9]\d{10}$/.test(this.userContact)) {
        this.validationErrors.push('Invalid contact number format. It should be a valid Chinese mainland phone number.');
      }

      this.isFormValid = this.validationErrors.length === 0;
    },
    submitOrder() {
      if (this.isFormValid) {
        this.$emit('clear-cart');
        alert('Order submitted successfully!');
      } else {
        alert('Please check your name, address, and contact number format!');
      }
    },
    removeFromCart(index) {
      this.$emit('remove-from-cart', index);
    }
  },
};
</script>

<style>
.validation-errors {
  color: red;
  margin-bottom: 1rem;
}
.validation-errors ul {
  margin: 0;
  padding-left: 1rem;
}
</style>