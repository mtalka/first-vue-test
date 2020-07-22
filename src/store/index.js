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
    }
  },
  actions: {
    fetchStats({ commit }, searchParameter) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3001/api/player/${searchParameter}`)
          .then(result => commit("UPDATE_PLAYER", result.data), resolve())
          .catch(error => {
            reject();
            throw new Error(`API ${error}`);
          });
      })
    }
  },
  modules: {}
});
