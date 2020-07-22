<template>
  <v-container>
    <v-col xl="6" offset-xl="3">
      <v-skeleton-loader :loading="loading" height="220" type="image">
        <v-row class="text-center">
          <v-col cols="6" sm="3">
            <v-card outlined min-height="100px">
              <v-card-text>Total K/D</v-card-text>
              <div class="highlight">{{ $store.state.player.totalKdAvg }}</div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card outlined min-height="100px">
              <v-card-text>Current level</v-card-text>
              <div class="highlight">{{ $store.state.player.level }}</div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card outlined min-height="100px">
              <v-card-text>Current ELO</v-card-text>
              <div class="highlight">{{ $store.state.player.currentELO }}</div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card outlined min-height="100px">
              <v-card-text>Average HS%</v-card-text>
              <div class="highlight">{{ $store.state.player.averageHS }}</div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card outlined min-height="100px">
              <v-card-text>Total Matches</v-card-text>
              <div class="highlight">{{ $store.state.player.totalMatchCount }}</div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card outlined min-height="100px">
              <v-card-text>Total wins</v-card-text>
              <div class="highlight">{{ $store.state.player.totalWinCount }}</div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card outlined min-height="100px">
              <v-card-text>Longest win streak</v-card-text>
              <div class="highlight">{{ $store.state.player.longestWinStreak }}</div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card outlined min-height="100px">
              <v-card-text>Bans</v-card-text>
              <div class="highlight">{{ $store.state.player.bans }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-skeleton-loader>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "AdditionalStats"
};
</script>

<style scoped>
.highlight {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>