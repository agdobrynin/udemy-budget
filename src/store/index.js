import Vue from "vue";
import Vuex from "vuex";
import budget from "./budget";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    budget,
  },
});
