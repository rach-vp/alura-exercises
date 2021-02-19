<template>
  <section class="card">
    <h2 class="card__title">{{ title }}</h2>
    <div class="card__body">
      <img :src="src" :alt="alt" class="card__body--picture">
    </div>
  </section>
</template>

<script>
export default {
  props: ['title', 'src', 'alt']
}
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
  }
</style>
