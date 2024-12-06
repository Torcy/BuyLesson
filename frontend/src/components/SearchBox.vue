<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search by name or ID" @input="emitSearchQuery" />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    searchResults: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const searchQuery = ref('');

    const emitSearchQuery = (event) => {
      searchQuery.value = event.target.value;
      props.searchResults(searchQuery.value);
    };

    return {
      searchQuery,
      emitSearchQuery
    };
  }
};
</script>