<template>
  <button class="button" :class="style">{{ label }}</button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return { style: `button-${this.type}` }
  }
};
</script>

<style scoped>
  .button {
    display: inline-block;
    padding: 10px;
    border-radius: 3px;
    margin: 10px;
    font-size: 1.2em;
  }

  .button-danger {
    background: firebrick;
    color: white;
  }

  .button-default {
    background: darkcyan;
    color: white;
  }
</style>