import Vue from "vue";
import App from "./App.vue";
import store from './store'
import router from "./router";
import ElementUI from "element-ui";
import './permission'
import "./styles.scss";

Vue.use(ElementUI);

Vue.prototype.$store = store;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
