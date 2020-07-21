<template>
  <v-container>
    <v-row>
      <v-col sm="12" xl="6" offset-xl="3">
        <v-text-field
          outlined
          dense
          placeholder="Search player"
          append-icon="mdi-magnify"
          v-model="playerToSearch"
          @click:append="searchPlayer(playerToSearch)"
          @keydown.enter="searchPlayer(playerToSearch)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="playerName">
      <AverageKd
        v-bind:kdAverage="kdAvg"
        v-bind:matchCount="matchCount"
        v-bind:playerName="playerName"
      />
      <BalancedRating v-bind:kdAverage="kdAvg" v-bind:eloAverage="eloAvg" />
    </v-row>
    <v-row class="text-center" v-if="!playerName">
      <v-col>
      Input a FaceIt username to get balanced K/D ratio.</v-col>
    </v-row>
  </v-container>
</template>

<script>
import AverageKd from "@/components/AverageKd";
import BalancedRating from "@/components/BalancedRating";
import axios from "axios";

export default {
  name: "Home",

  components: {
    AverageKd,
    BalancedRating
  },

  data: () => ({
    playerToSearch: "",
    matchCount: 0,
    kdAvg: 0,
    eloAvg: 0,
    kds: [],
    // API KEY GOES HERE
    playerName: ""
  }),
  methods: {
    searchPlayer(searchParameter) {
      axios
        .get(
          `https://open.faceit.com/data/v4/players?nickname=${searchParameter}`,
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`
            }
          }
        )
        .then(response => {
          this.fetchMatches(response.data.player_id);
          this.playerName = response.data.nickname;
        });
    },
    fetchMatches(playerId) {
      axios
        .get(
          `https://api.faceit.com/stats/api/v1/stats/time/users/${playerId}/games/csgo?size=2000`
        )
        .then(response => {
          this.kds = response.data.map(d => d.c2);
          const elos = response.data.map(d => !isNaN(d.elo) && Number(d.elo));
          this.eloAvg = (elos.reduce((a, b) => a + b, 0) / elos.length).toFixed(0);
        })
        .then(() => this.countKd());
    },
    countKd() {
      const numberKds = this.kds.map(i => Number(i)).sort();

      if (numberKds.length >= 10) {
        const spliceLength = Number((numberKds.length / 10).toFixed(0));
        numberKds.splice(0, spliceLength);
        numberKds.splice(numberKds.length - spliceLength, spliceLength);
      }
      this.kdAvg = (
        numberKds.reduce((a, b) => a + b, 0) / numberKds.length
      ).toFixed(2);

      this.matchCount = numberKds.length;
    }
  }
};
</script>