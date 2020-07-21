<template>
  <div id="home">
    <div v-for="item in items" v-bind:key="item">{{ item }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
// import ProfileBanner from "@/components/ProfileBanner.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component
class Home extends Vue {
  items = ["Yksi", "Kaksi", "Kolme"];
}

export default Home;
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
