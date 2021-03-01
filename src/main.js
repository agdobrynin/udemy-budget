import Vue from "vue";
import App from "./App.vue";
import "@/plugins/elements";
import "@/plugins/elements/css";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount("#app");
