<template>
  <div>
    <h1 class="centered">{{ title }}</h1>
    <h2 class="centered"></h2>

    <form @submit.prevent="save()">
      <div class="control">
        <label for="title">TITLE</label>
        <validation-provider rules="required" v-slot="{ errors }">
          <input id="title" autocomplete="off" v-model.lazy="picture.titulo" />
          <span>{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <div class="control">
        <label for="url">URL</label>
        <validation-provider rules="required" v-slot="{ errors }">
          <input id="url" autocomplete="off" v-model.lazy="picture.url" />
          <span>{{ errors[0] }}</span>
        </validation-provider>
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
        <router-link :to="{ name: 'home' }"><btn label="BACK" /></router-link>
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
      id: this.$route.params.id,
      service: new PictureService(this.$resource),
    };
  },
  methods: {
    save() {
      this.service
        .register(this.picture)
        .then(() => {
          if (this.id) this.$router.push({ name: "home" });
          this.picture = new Picture();
        })
        .catch((err) => alert(err));
    },
  },
  computed: {
    title() {
      return !this.id ? "Register" : "Edition";
    },
  },
  created() {
    if (this.id) {
      this.service.search(this.id).then((picture) => (this.picture = picture));
    }
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