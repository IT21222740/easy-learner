import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCys3ly_1kd7MuxJXk7nhE3c2wqeJRKlPA",
  authDomain: "afassignment-a104d.firebaseapp.com",
  projectId: "afassignment-a104d",
  storageBucket: "afassignment-a104d.appspot.com",
  messagingSenderId: "132608809103",
  appId: "1:132608809103:web:37143b8be3b020850678fa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
