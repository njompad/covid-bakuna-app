<template>
  <div>
    <div class="mb">Qr Stream</div>
    <div class="center stream">
      <qr-stream @decode="onDecode" class="mb">
        <div style="color: red" class="frame"></div>
      </qr-stream>
    </div>
  </div>
</template>

<script setup>
import firebase from "firebase";
import { useRouter } from "vue-router";
import { onBeforeUnmount, reactive } from "vue";
import { QrStream } from "vue3-qr-reader";

const dateData = new Date();
const dateToday = (dateData.getMonth()+1) + "-" +dateData.getDate() + "-" +dateData.getFullYear(); 
const timeToday = dateData.getHours() + ":" + dateData.getMinutes() + ":" + dateData.getSeconds();

const router = useRouter();
const authListener = firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    alert("You must be LOGGED IN to view this. Redirecting to the Home page.");
    router.push("/");
  } else if (!firebase.auth().currentUser.emailVerified) {
    alert(
      "You must VERIFY YOUR EMAIL to view this. Redirecting to the Home page."
    );
    router.push("/");
  }
});
const savedb = async ()=> {
firebase.firestore().collection(firebase.auth().currentUser.uid).doc("userInfo").set({
  name: state.userName,
}).then((data)=>{
  firebase.firestore().collection(firebase.auth().currentUser.uid).doc(dateToday).set({
    timeLog: firebase.firestore.FieldValue.arrayUnion(timeToday)
  });
});
}
const state = reactive({
  data: null,
  userName: "Nj Ompad",
  timeIn: [timeToday]
});
const onDecode = (data) => {
  state.data = data;
  savedb();
};

onBeforeUnmount(() => {
  authListener();
});
</script>
<style scoped>
.stream {
  max-height: 500px;
  max-width: 500px;
  margin: auto;
}
.frame {
  border-style: solid;
  border-width: 2px;
  border-color: red;
  height: 200px;
  width: 200px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
}
</style>