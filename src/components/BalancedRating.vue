<template>
  <v-container>
    <v-row class="text-center">
      <v-col xs="12" xl="6" offset-xl="3">
        <v-card>
          <v-card-text>
            BalancedKD score is {{Number(eloAverage) * Number(kdAverage)}}
          </v-card-text>
          <v-rating
          v-model="countRating"
          color="yellow darken-3"
          background-color="grey darken-1"
          half-increments
          readonly
          x-large
        ></v-rating>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AverageKd",
  props: ["kdAverage", "eloAverage"],
  data: () => ({}),
  computed: {
    countRating() {
      return (Number(this.eloAverage) * Number(this.kdAverage)) / 400;
    }
  }
};
</script>