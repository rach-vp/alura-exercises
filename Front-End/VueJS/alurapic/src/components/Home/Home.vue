<template>
  <section class="main-content">
    <h1 class="centered">{{ title }}</h1>
    <transition name="p-fade" :duration="500">
      <p v-show="message" class="centered">
        {{ message }}
      </p>
    </transition>
    <input
      type="search"
      class="filter"
      placeholder="Filter by title"
      @input="filterQuery = new RegExp($event.target.value.trim(), 'i')"
    />
    <ul class="list-pictures">
      <li
        class="list-pictures__item"
        v-for="picture of filteredCards"
        :key="picture.titulo"
      >
        <card :picture="picture" @remove-card="removeCard" @show-alert="updateMessage" />
      </li>
    </ul>
  </section>
</template>

<script>
import Card from "../shared/Card";
import PictureService from '../../domain/Picture/PictureService';

export default {
  components: {
    card: Card,
  },
  data() {
    return {
      title: "AluraPic",
      pictures: [],
      filterQuery: "",
      message: "",
    };
  },
  methods: {
    updateMessage(message) {
      setTimeout(() => (this.message = ""), 3000);
      this.message = message;
      console.log(`message: ${this.message}`);
    },
    removeCard(picture) {
      this.pictures.splice(this.pictures.indexOf(picture), 1);
    }
  },
  computed: {
    filteredCards() {
      let visibleCards = this.pictures;
      if (this.filterQuery) {
        visibleCards = this.pictures.filter(({ titulo }) =>
          titulo.match(this.filterQuery)
        );
      }
      return visibleCards;
    },
  },
  created() {
    this.service = new PictureService(this.$resource);

    this.service
      .create()
      .then(res => this.pictures = res)
      .catch(err => this.message = err);
  },
};
</script>

<style>
.centered {
  text-align: center;
}

.p-fade-enter-active,
.p-fade-leave-active {
  transition: all 0.3s;
}

.p-fade-enter,
.p-fade-leave-active {
  opacity: 0;
}

.main-content {
  font-family: Helvetica, sans-serif;
  margin: 0 auto;
  width: 96%;
}

.list-pictures {
  list-style: none;
}

.list-pictures__item {
  display: inline-block;
}

.filter {
  display: block;
  width: 100%;
}
</style>
