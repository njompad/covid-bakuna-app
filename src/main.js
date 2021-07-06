import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import QrReader from 'vue3-qr-reader'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBVs_ra1NZVEaH0fExNWx4dCoVuAA5yDPo",
  authDomain: "covid-bakuna.firebaseapp.com",
  projectId: "covid-bakuna",
  storageBucket: "covid-bakuna.appspot.com",
  messagingSenderId: "101893007769",
  appId: "1:101893007769:web:17e4ae61549ef74203cb08",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount("#app");
