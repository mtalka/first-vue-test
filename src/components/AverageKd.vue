<template>
  <v-container>
    <v-row class="text-center">
      <v-col xs="12" xl="6" offset-xl="3">
        <v-card outlined>
          <v-card-text>
            <span class="small-highlight">{{ playerName }}</span> balanced K/D ratio
          </v-card-text>
          <div class="kd">{{ kdAverage }}</div>
          <v-card-text>
            across
            <span class="small-highlight">{{ matchCount }}</span> matches with
            <span class="small-highlight">{{ eloAvg }}</span> ELO average
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AverageKd",
  props: ["kdAverage", "matchCount", "playerName", "eloAvg"],
  data: () => ({})
};
</script>

<style scoped>
.small-highlight {
  font-weight: 600;
}
.kd {
  font-weight: 600;
  font-size: 10rem;
}
</style>