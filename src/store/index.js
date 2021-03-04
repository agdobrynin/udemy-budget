import Vue from "vue";
import Vuex from "vuex";
import budget from "./budget";
import dataState from "./budget/persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    budget,
  },
  plugins: [dataState],
});
