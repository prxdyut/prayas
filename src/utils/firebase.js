import firebase from "firebase/compat/app";

export default function InitializeFirebase() {
  const config = {
    apiKey: "AIzaSyCZD0uBHDlShS05r4cm19KpNVob3Sq0VqI",
    authDomain: "prayas-ae424.firebaseapp.com",
    projectId: "prayas-ae424",
    storageBucket: "prayas-ae424.appspot.com",
    messagingSenderId: "284802831251",
    appId: "1:284802831251:web:f336f78b28da4456eb0e66",
    measurementId: "G-X37C93QSDM",
  };
  firebase.initializeApp(config);
}
