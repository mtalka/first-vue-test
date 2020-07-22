<template>
  <v-container>
    <v-row class="text-center">
      <v-col xs="12" md="6" offset-md="3" xl="4" offset-xl="4">
        <h3>You aren't as bad as your worst day.</h3>
        <h4>(Nor as good as your best day.)</h4>
        <div class="explanation">
          All players sometimes have off games. Sometimes your enemies or teammates are trolling, throwing, griefing or smurfing.
        </div>
        <div class="explanation">
          Such games hardly represent your true skill. In order to filter out
          these games, we exclude the bottom ten percent of games and the top
          ten percent of games based on kill / death average.
        </div>
        <div class="explanation">
          The BalancedKD score is measured by multiplying your balanced K/D
          ratio with your average ELO. BalancedKD score shows the ELO in which you will consistently average 1.00 K/D ratio. Score of 2000 grants you five stars.
        </div>
        <div class="powered-by align-center">
          <h3>Powered by</h3>
          <v-img
            alt="FaceIt logo for light"
            class="shrink mt-1"
            contain
            v-if="!$vuetify.theme.dark"
            min-width="100"
            src="https://developers.faceit.com/static/media/RGB-FACEIT-Logo-Dark.e445741d.jpg"
            width="400"
          />
          <v-img
            alt="FaceIt logo for dark"
            class="shrink mt-1"
            contain
            v-if="$vuetify.theme.dark"
            min-width="100"
            src="https://developers.faceit.com/static/media/RGB-FACEIT-Logo-Bright.c3553633.png"
            width="400"
          />
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
  font-size: 0.85rem;
}

.powered-by {
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>