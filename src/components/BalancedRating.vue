<template>
  <v-container>
    <v-card outlined>
      <v-card-text>
        BalancedKD score is
        <span class="small-highlight">{{ countScore }}</span>
      </v-card-text>
      <div class="verdict" v-bind:style="{ color: verdictColor }">{{ verdict }}</div>
      <v-rating
        :value="countRating"
        color="#d7be69"
        background-color="grey darken-1"
        half-increments
        readonly
        x-large
      ></v-rating>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "BalancedRating",
  props: ["kdAverage", "eloAverage"],
  data: () => ({}),
  computed: {
    countRating() {
      return (Number(this.eloAverage) * Number(this.kdAverage)) / 400;
    },
    countScore() {
      return (Number(this.eloAverage) * Number(this.kdAverage)).toFixed(0);
    },
    verdict() {
      const score = this.countScore;
      if (score > 2999) {
        return "Perfect";
      } else if (score > 1999) {
        return "Excellent";
      } else if (score > 1499) {
        return "Good";
      } else if (score > 999) {
        return "Fair";
      } else if (score > 799) {
        return "Poor";
      } else {
        return "Horrible";
      }
    },
    verdictColor() {
      const score = this.countScore;
      if (score > 2999) {
        return "lawngreen";
      } else if (score > 1999) {
        return "lightgreen";
      } else if (score > 1499) {
        return "lightskyblue";
      } else if (score > 999) {
        return "#dde2a1";
      } else if (score > 799) {
        return "lightcoral";
      } else {
        return "orangered";
      }
    }
  }
};
</script>

<style scoped>
.small-highlight {
  font-weight: 600;
}

.verdict {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>