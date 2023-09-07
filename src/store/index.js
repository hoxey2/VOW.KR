import { createStore } from "vuex";
import { Keyword } from "./modules/keyword";

export default createStore({
  state: {
    API_KEY: "RGAPI-e9934805-d207-4406-9b01-fc02b1aca57d"
  },
  getters: {
  },
  mutations: {
  },
  modules: { Keyword }
});