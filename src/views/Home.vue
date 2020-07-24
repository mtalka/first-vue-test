<template>
  <v-container>
    <v-row>
      <v-col sm="12" xl="6" offset-xl="3">
        <v-text-field
          outlined
          dense
          placeholder="Search player"
          append-icon="mdi-magnify"
          append-outer-icon="mdi-trash-can-outline"
          v-model="playerToSearch"
          @click:append="searchPlayer(playerToSearch)"
          @click:append-outer="discardPlayer()"
          @keydown.enter="searchPlayer(playerToSearch)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense v-if="loading">
      <v-col xs="12" xl="6" offset-xl="3">
        <v-col>
          <v-skeleton-loader :loading="loading" height="120" type="image" />
        </v-col>
        <v-col>
          <v-skeleton-loader :loading="loading" height="200" type="image" />
        </v-col>
        <v-col>
          <v-skeleton-loader :loading="loading" height="120" type="image" />
        </v-col>
        <v-col>
          <v-skeleton-loader :loading="loading" height="120" type="image" />
        </v-col>
      </v-col>
    </v-row>
    <v-row v-if="$store.state.player.playerName && loading === false">
      <v-row dense class="text-center">
        <v-col xs="12" xl="6" offset-xl="3">
          <h1>{{ $store.state.player.playerName }}</h1>
          <BalancedRating v-bind:kdAverage="kdAvg" v-bind:eloAverage="eloAvg" />
          <AverageKd
            v-bind:kdAverage="kdAvg"
            v-bind:matchCount="matchCount"
            v-bind:playerName="$store.state.player.playerName"
            v-bind:eloAvg="eloAvg"
          />
          <AdditionalStats />
        </v-col>
      </v-row>
    </v-row>
    <v-row class="text-center" v-if="!$store.state.player.playerName && loading === false">
      <v-col class="input-guide">Input a FaceIt name to get balanced K/D ratio and score.</v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="4000" :top="true">
      Player not found
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import AverageKd from "@/components/AverageKd";
import BalancedRating from "@/components/BalancedRating";
import AdditionalStats from "@/components/AdditionalStats";
import axios from "axios";

export default {
  name: "Home",

  components: {
    AverageKd,
    BalancedRating,
    AdditionalStats
  },

  data: () => ({
    playerToSearch: "",
    loading: false,
    snackbar: false
  }),
  methods: {
    searchPlayer(searchParameter) {
      this.loading = true;
      this.$store
        .dispatch("fetchStats", searchParameter)
        .then(() => this.insertPlayerLogEntry(searchParameter))
        .catch(() => (this.snackbar = true))
        .finally(() => (this.loading = false));
    },
    discardPlayer() {
      this.$store.dispatch("discardPlayer");
      this.playerToSearch = "";
    },
    insertPlayerLogEntry(parameterForEntry) {
      axios.post("/api/players", {
        playerName: parameterForEntry
      });
    }
  },
  computed: {
    matches() {
      return this.$store.state.matches;
    },
    playerName() {
      return this.$store.state.player.playerName;
    },
    kdAvg() {
      const kds = this.matches.map(m => m.c2);
      const numberKds = kds.map(i => Number(i)).sort();

      if (numberKds.length >= 10) {
        const spliceLength = Number((numberKds.length / 10).toFixed(0));
        numberKds.splice(0, spliceLength);
        numberKds.splice(numberKds.length - spliceLength, spliceLength);
      }
      return (numberKds.reduce((a, b) => a + b, 0) / numberKds.length).toFixed(
        2
      );
    },
    eloAvg() {
      const elos = this.matches.map(d => !isNaN(d.elo) && Number(d.elo));
      return (elos.reduce((a, b) => a + b, 0) / elos.length).toFixed();
    },
    matchCount() {
      const kds = this.matches.map(m => m.c2);
      const numberKds = kds.map(i => Number(i)).sort();

      if (numberKds.length >= 10) {
        const spliceLength = Number((numberKds.length / 10).toFixed(0));
        numberKds.splice(0, spliceLength);
        numberKds.splice(numberKds.length - spliceLength, spliceLength);
      }
      return numberKds.length;
    }
  }
};
</script>

<style scoped>
.input-guide {
  font-size: 0.85rem;
}
</style>