<template>
  <main class="main-content">
    <h1 class="centered">{{ title }}</h1>
    <ul class="list-pictures">
      <li class="list-pictures__item" v-for="{ url, titulo } of pictures" :key="titulo">
        <card :title="titulo" :src="url" :alt="titulo" />
      </li>
    </ul>
  </main>
</template>

<script>
import Card from './components/shared/Card/Card';

export default {
  components: {
    'card': Card,
  },
  data () {
    return {
      title: "AluraPic",
      pictures: [],
    }
  },
  created () {
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(res => this.pictures = res, err => console.log(err));
  }
}
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
</style>
