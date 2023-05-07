const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// CONFIGURACION FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDIHJ0vWz8Hm1A268G0fcEBzx_z-cXcAMo",
  authDomain: "proyecto-faunatico.firebaseapp.com",
  projectId: "proyecto-faunatico",
  storageBucket: "proyecto-faunatico.appspot.com",
  messagingSenderId: "446855150030",
  appId: "1:446855150030:web:4dd5e6367629d8e6f9939f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//CONFIGURACION FIREBASE ADMIN

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "proyecto-faunatico.appspot.com"
});

//EXPORTAR
module.exports = {
  app,
  admin
};
