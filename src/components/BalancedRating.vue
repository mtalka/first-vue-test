<template>
  <v-container>
    <v-row class="text-center">
      <v-col xs="12" xl="6" offset-xl="3">
        <v-skeleton-loader :loading="loading" height="110" type="image">
          <v-card outlined>
            <v-card-text>
              BalancedKD score is
              <span class="small-highlight">{{ (Number(eloAverage) * Number(kdAverage)).toFixed(0) }}</span>
            </v-card-text>
            <v-rating
              :value="countRating"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              readonly
              x-large
            ></v-rating>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BalancedRating",
  props: ["kdAverage", "eloAverage", "loading"],
  data: () => ({}),
  computed: {
    countRating() {
      return (Number(this.eloAverage) * Number(this.kdAverage)) / 400;
    }
  }
};
</script>

<style scoped>
.small-highlight {
  font-weight: 600;
}
</style>