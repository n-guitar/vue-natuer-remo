import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AirMenu from "../views/AirMenu.vue";
import TvMenu from "../views/TvMenu.vue";
import OtherMenu from "../views/OtherMenu.vue";
import SettingMenu from "../views/SettingMenu.vue";
// 一時的
import Work from "../views/Work.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/air",
    name: "AirMenu",
    component: AirMenu,
  },
  {
    path: "/tv",
    name: "TvMenu",
    component: TvMenu,
  },
  {
    path: "/other",
    name: "OtherMenu",
    component: OtherMenu,
  },
  {
    path: "/setting",
    name: "SettingMenu",
    component: SettingMenu,
  },
  {
    path: "/work",
    name: "Work",
    component: Work,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
