<template>
  <div>
    <h1>{{ title }}</h1>
    <img v-for="pic in pictures" :key="pic.titulo" :src="pic.url" :alt="pic.titulo">
  </div>
</template>

<script>
export default {
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
