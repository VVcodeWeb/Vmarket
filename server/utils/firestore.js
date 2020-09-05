const admin = require("firebase-admin");

const serviceAccount = require("../config/firestore-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vsale-809d2.firebaseio.com",
  storageBucket: "vsale-809d2.appspot.com"
});

const db = admin.firestore();

console.log("Firestore fires!")

module.exports = {db, admin}