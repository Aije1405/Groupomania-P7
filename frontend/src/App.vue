<template>
  <div id="app" class="d-flex">
    <Header />
        <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  components: {
    Header,
  },
};
</script>

<style >
body{
  background-image: url("assets/fond.png");
  background-attachment: fixed;
}
</style>
