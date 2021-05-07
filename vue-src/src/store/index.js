import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    baseUrl: "https://api.nature.global/",
    // apiStatus: "",
    appliancesList: [],
    device: "",
    airTemp: "",
  },
  mutations: {
    setToken(state, token) {
      console.log("[store][mutations]setToken", token);
      state.token = token.token;
    },
    setAppliances(state, payload) {
      console.log("[store][mutations]setAppliances", payload);
      state.appliancesList = payload;
    },
    setDevice(state, payload) {
      console.log("[store][mutations]setDevice", payload);
      state.device = payload;
    },
  },
  actions: {
    setTokenAction({ commit }, token) {
      commit("setToken", token);
    },
    setAppliancesAction({ commit }, payload) {
      commit("setAppliances", payload);
    },
    setDeviceAction({ commit }, payload) {
      commit("setDevice", payload);
    },
  },
  modules: {},
});
