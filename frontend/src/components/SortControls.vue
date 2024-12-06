<!-- SortControls.vue -->
<template>
    <div>
      <button @click="sortBy('name', 'asc')">Sort by Name Asc</button>
      <button @click="sortBy('name', 'desc')">Sort by Name Desc</button>
      <button @click="sortBy('price', 'asc')">Sort by Price Asc</button>
      <button @click="sortBy('price', 'desc')">Sort by Price Desc</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sort: Function,
    },
    methods: {
      sortBy(field, order) {
        this.sort(field, order);
      },
    },
  };
  </script>