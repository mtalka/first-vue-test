<template>
  <v-container>
    <v-card outlined>
      <div class="verdict" v-bind:style="{ color: verdictColor }">Balanced {{ verdict }}</div>
      <v-rating
        :value="countRating"
        color="#d7be69"
        background-color="grey darken-1"
        readonly
        half-increments
        length="5"
      ></v-rating>
      <v-card-text>
        Player can consistently achieve a 
      <span class="small-highlight">K/D ratio of 1</span> in a game with an average ELO of
      </v-card-text>
      <div class="count-score">{{ countScore }}</div>
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
      const score = this.countScore;
      if (score > 2999) {
        return 5;
      } else if (score > 1850) {
        return 4.5;
      } else if (score > 1700) {
        return 4;
      } else if (score > 1550) {
        return 3.5;
      } else if (score > 1400) {
        return 3;
      } else if (score > 1250) {
        return 2.5;
      } else if (score > 1100) {
        return 2;
      } else if (score > 950) {
        return 1.5;
      } else if (score > 800) {
        return 1;
      } else {
        return 0;
      }
    },
    countScore() {
      return (Number(this.eloAverage) * Number(this.kdAverage)).toFixed(0);
    },
    verdict() {
      const score = this.countScore;
      if (score > 2999) {
        return "level 10";
      } else if (score > 1850) {
        return "level 9";
      } else if (score > 1700) {
        return "level 8";
      } else if (score > 1550) {
        return "level 7";
      } else if (score > 1400) {
        return "level 5";
      } else if (score > 1250) {
        return "level 5";
      } else if (score > 1100) {
        return "level 4";
      } else if (score > 950) {
        return "level 3";
      } else if (score > 800) {
        return "level 2";
      } else {
        return "level 1";
      }
    },
    verdictColor() {
      const score = this.countScore;
      if (score > 2000) {
        return "red";
      } else if (score > 1700) {
        return "orangered";
      } else if (score > 1100) {
        return "gold";
      } else if (score > 800) {
        return "limegreen";
      } else {
        return "grey";
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
  margin-top: 2rem;
}

.count-score {
  font-weight: 600;
  font-size: 10rem;
}
</style>