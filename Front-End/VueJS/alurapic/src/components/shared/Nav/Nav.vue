<template>
  <nav>
    <li :key="path" v-for="{ path, title } in routes">
      <router-link :to="path ? path : '/'">{{ title }}</router-link>
    </li>
  </nav>
</template>

<script>
import routes from "../../../routes";

export default {
  data() {
    return { routes };
  },
};
</script>