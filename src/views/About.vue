<template>
  <v-container>
    <v-row class="text-center">
      <v-col xs="12" lg="6" offset-lg="3">
        <h3>
          You aren't as bad as your worst day.
        </h3>
        <h4>
          (Nor as good as your best day.)
        </h4>
        <div class="explanation">
          All players sometimes have off games. All players also sometimes have games in which everything seems to work out for the best. Sometimes your enemy is trolling, throwing, griefing or smurfing.
        </div>
        <div class="explanation">
          Such games hardly represent your true skill, but are unfortunately rather common when playing in a pick-up game client due to number of factors.
          In order to filter out these games, we exclude the bottom ten percent of games and the top ten percent of games based on kill / death average.
        </div>
        <div class="explanation">
          The BalancedKD score is measured by multiplying your balanced K/D ratio with your average ELO. BalancedKD score of 2000 or more gives you a five star rating, meaning that you can carry your own weight in a 2000 ELO game or double your weight in a 1000 ELO game.
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-switch
          v-model="$vuetify.theme.dark"
          hide-details
          inset
          label="dark theme"
        ></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.explanation {
  margin-top: 1.5rem;
}
</style>