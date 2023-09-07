import { ref } from "vue";

export const Keyword = {
  state: {
    keyword: ref("")
  },
  getters: {
    getKeyword(state) {
      return state.keyword
    },
  },
  mutations: {
    setKeyword(state, value) {
      state.keyword = value;
    }
  }
};