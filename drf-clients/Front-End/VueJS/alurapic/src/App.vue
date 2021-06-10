<template>
  <div>
    <nav-bar />
    <main>
      <transition name="main">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import Nav from './components/shared/Nav';

export default {
  components: {
    'nav-bar': Nav,
  }
};
</script>

<style>
  .main-enter,
  .main-leave-active {
    opacity: 0;
  }

  .main-leave-active,
  .main-enter-active {
    transition: opacity 0.3s;
  }
</style>
