<template>
  <div class="search-box">
    <input type="text" v-model="searchQuery" placeholder="search" @input="emitSearchQuery" />
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    emitSearchQuery() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>

<style scoped>
.search-box input {
  padding: 10px;
  width: 80%;
  margin-bottom: 20px;
}
</style>