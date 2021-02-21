<template>
  <div>
    <h1 class="centered">Register</h1>
    <h2 class="centered"></h2>

    <form @submit.prevent="save()">
      <div class="control">
        <label for="title">TITLE</label>
        <input id="title" autocomplete="off" v-model.lazy="picture.titulo" />
      </div>

      <div class="control">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="picture.url" />
        <img v-show="picture.url" :src="picture.url" :alt="picture.titulo" />
      </div>

      <div class="control">
        <label for="description">DESCRIPTION</label>
        <textarea
          id="description"
          autocomplete="off"
          v-model.lazy="picture.description"
        ></textarea>
      </div>

      <div class="centered">
        <btn label="SAVE" :submit="true" />
        <router-link to="/"><btn label="BACK" /></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Button from "../shared/Button";
import Picture from "../../domain/Picture";
import PictureService from "../../domain/Picture/PictureService";

export default {
  components: {
    btn: Button,
  },
  data() {
    return {
      picture: new Picture(),
    };
  },
  methods: {
    save() {
      this.service = new PictureService(this.$resource);

      this.service
        .register(this.picture)
        .then(() => (this.picture = new Picture()))
        .catch((err) => alert(err));
    },
  },
};
</script>

<style scoped>
.centered {
  text-align: center;
}

.control {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.control label {
  display: block;
  font-weight: bold;
}

.control label + input,
.control textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

img {
  width: 100%;
}
</style>