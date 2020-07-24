import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player: {},
    matches: []
  },
  mutations: {
    UPDATE_PLAYER(state, data) {
      state.player = data.player;
      state.matches = data.matches;
    },
    DISCARD_PLAYER(state) {
      state.player = {};
      state.matches = [];
    }
  },
  actions: {
    fetchStats({ commit }, searchParameter) {
      return new Promise((resolve, reject) => {
        const baseUrl = `/api/player/${searchParameter}`
        axios
          .get(baseUrl)
          .then(result => commit("UPDATE_PLAYER", result.data))
          .then(() => resolve())
          .catch(error => {
            reject();
            throw new Error(`API ${error}`);
          });
      })
    },
    discardPlayer({ commit }) {
      commit("DISCARD_PLAYER");
    }
  },
  modules: {}
});
