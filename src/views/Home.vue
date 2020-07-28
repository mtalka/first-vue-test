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
    <v-row
      class="data-table text-center"
      v-if="!$store.state.player.playerName && loading === false"
    >
      <v-col cols="12" lg="6" xl="3" offset-xl="3">
        <h3 class="data-grid-title">Most searched</h3>
        <v-data-table
          :headers="top10headers"
          :items="top10"
          mobile-breakpoint="0"
          hide-default-footer
          class="elevation-1 pointer"
          @click:row="searchPlayer($event.playerName)"
        >
          <template v-slot:item.rating="{ item }">
            <v-rating
              :value="countRating(item)"
              color="#d7be69"
              background-color="grey darken-1"
              half-increments
              small
              dense
              readonly
            ></v-rating>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" lg="6" xl="3">
        <h3 class="data-grid-title">Latest searches</h3>
        <v-data-table
          :headers="latestHeaders"
          :items="latest"
          mobile-breakpoint="0"
          hide-default-footer
          class="elevation-1 pointer"
          @click:row="searchPlayer($event.playerName)"
        >
          <template v-slot:item.rating="{ item }">
            <v-rating
              :value="countRating(item)"
              color="#d7be69"
              background-color="grey darken-1"
              half-increments
              small
              dense
              readonly
            ></v-rating>
          </template>
        </v-data-table>
      </v-col>
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
    snackbar: false,
    top10: [],
    latest: [],
    top10headers: [
      { text: "Name", value: "playerName", sortable: false },
      { text: "BalancedKD score", value: "balancedKDscore", sortable: false },
      { text: "Rating", value: "rating", align: "right", sortable: false }
    ],
    latestHeaders: [
      { text: "Name", value: "playerName", sortable: false },
      { text: "BalancedKD score", value: "balancedKDscore", sortable: false },
      { text: "Rating", value: "rating", align: "right", sortable: false }
    ]
  }),
  mounted() {
    axios
      .get("/api/players/latest")
      .then(result => (this.latest = result.data));
    axios.get("/api/players/top10").then(result => (this.top10 = result.data));
  },
  methods: {
    searchPlayer(searchParameter) {
      this.loading = true;
      this.$store
        .dispatch("fetchStats", searchParameter)
        .then(() => {
          this.insertPlayerLogEntry(searchParameter);
          this.scrollToTop();
        })
        .catch(() => (this.snackbar = true))
        .finally(() => (this.loading = false));
    },
    discardPlayer() {
      this.$store.dispatch("discardPlayer");
      this.playerToSearch = "";
    },
    insertPlayerLogEntry(parameterForEntry) {
      const balancedKdAvg = this.kdAvg;
      const balancedKDscore = (
        Number(this.eloAvg) * Number(this.kdAvg)
      ).toFixed(0);
      axios.put("/api/players", {
        playerName: parameterForEntry,
        totalKDratio: this.$store.state.player.totalKdAvg,
        balancedKDratio: balancedKdAvg,
        balancedKDscore: balancedKDscore
      });
    },
    countRating(item) {
      return Number(item.balancedKDscore) / 400;
    },
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
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
.data-grid-title {
  margin-bottom: 1rem;
}
.pointer {
  cursor: pointer;
}
</style>