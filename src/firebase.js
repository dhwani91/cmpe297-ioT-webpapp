import firebase from "firebase";
import firebaseConfig from "./config/firebaseConfig.json";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
