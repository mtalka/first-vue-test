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
          <AverageKd
            v-bind:kdAverage="kdAvg"
            v-bind:matchCount="matchCount"
            v-bind:playerName="$store.state.player.playerName"
            v-bind:eloAvg="eloAvg"
          />
          <BalancedRating v-bind:kdAverage="kdAvg" v-bind:eloAverage="eloAvg" />
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
            <span class="verdict">Level </span><span class="verdict" v-bind:style="{ color: verdictColor(item) }">{{verdict(item)}}</span>
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
            <span class="verdict">Level </span><span class="verdict" v-bind:style="{ color: verdictColor(item) }">{{verdict(item)}}</span>
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
      { text: "1 K/D ELO Avg.", value: "balancedKDscore", sortable: false },
      { text: "Balanced level", value: "rating", align: "right", sortable: false }
    ],
    latestHeaders: [
      { text: "Name", value: "playerName", sortable: false },
      { text: "1 K/D ELO Avg.", value: "balancedKDscore", sortable: false },
      { text: "Balanced level", value: "rating", align: "right", sortable: false }
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
    verdict(item) {
      const score = Number(item.balancedKDscore);
      if (score > 2999) {
        return "10";
      } else if (score > 1850) {
        return "9";
      } else if (score > 1700) {
        return "8";
      } else if (score > 1550) {
        return "7";
      } else if (score > 1400) {
        return "5";
      } else if (score > 1250) {
        return "5";
      } else if (score > 1100) {
        return "4";
      } else if (score > 950) {
        return "3";
      } else if (score > 800) {
        return "2";
      } else {
        return "1";
      }
    },
    countRating(item) {
      if (Number(item.balancedKDscore) > 2999) {
        return 5;
      } else if (Number(item.balancedKDscore) > 1850) {
        return 4.5;
      } else if (Number(item.balancedKDscore) > 1700) {
        return 4;
      } else if (Number(item.balancedKDscore) > 1550) {
        return 3.5;
      } else if (Number(item.balancedKDscore) > 1400) {
        return 3;
      } else if (Number(item.balancedKDscore) > 1250) {
        return 2.5;
      } else if (Number(item.balancedKDscore) > 1100) {
        return 2;
      } else if (Number(item.balancedKDscore) > 950) {
        return 1.5;
      } else if (Number(item.balancedKDscore) > 800) {
        return 1;
      } else {
        return 0;
      }
    },
    verdictColor(item) {
      const score = Number(item.balancedKDscore);
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
.verdict {
  font-size: .7rem;
}
</style>