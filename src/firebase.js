import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAxF4E54LBzVzWVejlepETlyH_adKMb9Gc",
  authDomain: "react-auth-92484.firebaseapp.com",
  projectId: "react-auth-92484",
  storageBucket: "react-auth-92484.appspot.com",
  messagingSenderId: "686837353152",
  appId: "1:686837353152:web:93872107ccb9363fb47b25"
};

let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { googleAuthProvider, facebookAuthProvider };
