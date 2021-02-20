<template>
  <section class="main-content">
    <h1 class="centered">{{ title }}</h1>
    <input
      type="search"
      class="filter"
      placeholder="Filter by title"
      @input="filterQuery = new RegExp($event.target.value.trim(), 'i')"
    />
    <ul class="list-pictures">
      <li
        class="list-pictures__item"
        v-for="{ url, titulo } of filteredCards"
        :key="titulo"
      >
        <card :title="titulo" :src="url" :alt="titulo" />
      </li>
    </ul>
  </section>
</template>

<script>
import Card from "../shared/Card";

export default {
  components: {
    card: Card,
  },
  data() {
    return {
      title: "AluraPic",
      pictures: [],
      filterQuery: "",
    };
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
    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then((res) => res.json())
      .then(
        (res) => (this.pictures = res),
        (err) => console.log(err)
      );
  },
};
</script>

<style>
.centered {
  text-align: center;
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
