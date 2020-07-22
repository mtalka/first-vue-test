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
    <!-- <v-row v-if="playerName"> -->
    <v-row>
      <BalancedRating
        v-bind:kdAverage="kdAvg"
        v-bind:eloAverage="eloAvg"
        v-bind:loading="loading"
      />
      <AverageKd
        v-bind:kdAverage="kdAvg"
        v-bind:matchCount="matchCount"
        v-bind:playerName="$store.state.player.playerName"
        v-bind:eloAvg="eloAvg"
        v-bind:loading="loading"
      />
      <AdditionalStats />
    </v-row>
    <v-row class="text-center" v-if="!playerName">
      <v-col>Input a FaceIt username to get balanced K/D ratio and BalancedKD score.</v-col>
    </v-row>
  </v-container>
</template>

<script>
import AverageKd from "@/components/AverageKd";
import BalancedRating from "@/components/BalancedRating";
import AdditionalStats from "@/components/AdditionalStats";

export default {
  name: "Home",

  components: {
    AverageKd,
    BalancedRating,
    AdditionalStats
  },

  data: () => ({
    playerToSearch: "",
    matchCount: 0,
    kdAvg: 0,
    eloAvg: 0,
    kds: [],
    playerName: ""
  }),
  mounted() {
    if (this.matches) {
      this.kdMappings();
    }
  },
  methods: {
    searchPlayer(searchParameter) {
      this.loading = true;
      this.$store
        .dispatch("fetchStats", searchParameter)
        .then(() => {
          this.kdMappings();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    kdMappings() {
      this.kds = this.matches.map(m => m.c2);
      const elos = this.matches.map(d => !isNaN(d.elo) && Number(d.elo));
      this.eloAvg = (elos.reduce((a, b) => a + b, 0) / elos.length).toFixed();
      this.countKd();
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
  },
  computed: {
    matches() {
      return this.$store.state.matches;
    },
    playerName() {
      return this.$store.state.player.playerName;
    }
  }
};
</script>
