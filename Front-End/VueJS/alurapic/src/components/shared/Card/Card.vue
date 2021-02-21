<template>
  <section class="card">
    <h2 class="card__title" @dblclick="visible = !visible">
      {{ picture.titulo }}
    </h2>
    <transition name="card__body--fade">
      <div class="card__body" v-show="visible">
        <img
          v-el-transform
          :src="picture.url"
          :alt="picture.titulo"
          class="card__body--picture"
        />
        <btn
          type="danger"
          label="DELETE"
          :confirmation="true"
          @actionConfirmed="remove(picture)"
        />
      </div>
    </transition>
  </section>
</template>

<script>
import Button from "../Button";

export default {
  props: {
    picture: {
      titulo: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  components: {
    btn: Button,
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    remove(picture) {
      this.$http
        .delete(`http://localhost:3000/v1/fotos/${picture._id}`)
        .then(() => {
          this.$emit("show-alert", "Picture succesfully deleted");
          this.$emit("remove-card", picture);
        })
        .catch((err) => {
          this.$emit("show-alert", "Cannot remove picture");
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.card {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 5px;
  box-shadow: 5px 5px 10px grey;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
  user-select: none;
}

.card__title {
  text-align: center;
  border: solid 2px;
  background: lightblue;
  margin: 0 0 15px 0;
  padding: 10px;
  text-transform: uppercase;
}

.card__body--picture {
  width: 100%;
  transition: transform 0.2s;
}

.card__body--fade-enter,
.card__body--fade-leave-active {
  opacity: 0;
}

.card__body--fade-leave-active,
.card__body--fade-enter-active {
  transition: opacity 0.5s;
}
</style>
