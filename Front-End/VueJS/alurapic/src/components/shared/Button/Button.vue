<template>
  <button @click="confirmAction()" class="button" :class="btnType">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
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
  computed: {
    btnType() {
      return !this.type || this.type === "default"
        ? `button-default`
        : `button-${this.type}`;
    },
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