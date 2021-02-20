<template>
  <button @click="confirmAction()" class="button" :class="style">
    {{ label }}
  </button>
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
    confirmation: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return { style: `button-${this.type}` };
  },
  methods: {
    confirmAction() {
      if (!this.confirmation) this.$emit("actionConfirmed");
      else if (confirm("Would you like to proceed?"))
        this.$emit("actionConfirmed");
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
  cursor: pointer;
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