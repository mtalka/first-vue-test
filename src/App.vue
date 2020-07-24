<template>
  <v-app>
    <v-app-bar app flat color="primary" dark>
      <router-link to="/">
        <div class="d-flex align-center">
          <!-- <v-img
            alt="BalancedKD Logo"
            class="shrink mr-2"
            contain
            src="./assets/balancedkd-logo.png"
            transition="scale-transition"
            width="60"
          /> -->

          <v-img
            alt="BalancedKD Name"
            class="shrink mt-1"
            contain
            min-width="100"
            src="./assets/balancedkd-text.png"
            width="250"
          />
        </div>
      </router-link>

      <v-spacer></v-spacer>
      
        <v-btn text outlined class="light-switch" @click="lightSwitch()">
          <v-icon>
            mdi-brightness-6
          </v-icon>
         </v-btn>
      <router-link :to="nextRouteName" class="text-decoration-none">
        <v-btn text outlined>
          <v-icon>
            {{ currentRouteName === "Home" ? "mdi-information-outline mdi-24px" : "mdi-home mdi-24px" }}
          </v-icon>
         </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    nextRouteName() {
      if (this.$route.name === "Home") {
        return "/about";
      } else {
        return "/";
      }
    }
  },
  methods: {
    lightSwitch() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>

<style scoped>
.light-switch {
  margin-right: .25rem;
}
</style>