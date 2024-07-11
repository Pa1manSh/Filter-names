import Vue from "vue";
import Router from "vue-router";

import PlayerProfile from "../components/PlayerProfile.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/player/:name",
      name: "player",
      component: PlayerProfile,
    },
  ],
});
