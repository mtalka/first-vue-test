<template>
  <v-container>
    <v-row class="text-center">
      <v-col xs="12" xl="6" offset-xl="3">
        <v-card>
          <v-card-text>
            <span class="player-name">{{ playerName }}</span> balanced K/D ratio
          </v-card-text>
          <div class="kd">{{ kdAverage }}</div>
          <v-card-text>across {{ matchCount }} matches</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AverageKd",
  props: ["kdAverage", "matchCount", "playerName"],
  data: () => ({})
};
</script>

<style scoped>
.player-name {
  font-weight: 600;
}
.kd {
  font-weight: 600;
  font-size: 10rem;
}
</style>