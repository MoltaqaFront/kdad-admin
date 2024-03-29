import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// Start:: Importing Main Sass Styles File
import "./assets/sass/main.scss";
// End:: Importing Main Sass Styles File

// Start:: Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// End:: Importing Bootstrap

// Start:: Importing Plugins
import i18n from "./plugins/i18n";
import axios from "./plugins/axios";
import vuetify from "./plugins/vuetify";
import Antd from "./plugins/antDesign";
import "./plugins/googleMaps";
import "./plugins/formComponents";
import "./plugins/globalComponents";
import "./plugins/3rdPartyLibraries";

import firebase from "firebase/app";
import "firebase/firebase-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAy5q9MGes19yfEwP7_OHVpEkHgcGmj6-s",
  authDomain: "kdadeltariq-25e2f.firebaseapp.com",
  projectId: "kdadeltariq-25e2f",
  storageBucket: "kdadeltariq-25e2f.appspot.com",
  messagingSenderId: "1070281269059",
  appId: "1:1070281269059:web:e1e3946a72534a057359f6",
  measurementId: "G-68KP3K49L7"
};

firebase.initializeApp(firebaseConfig);
// End:: Importing Plugins

// Start:: Set App Lang  & Theme
store.dispatch("AppLangModule/handelAppDefaultLanguage");
store.dispatch("AppThemeModule/handelAppDefaultTheme");
// End:: Set App Lang  & Theme

Vue.use(Antd);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
