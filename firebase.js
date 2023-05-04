import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

    apiKey: "AIzaSyClTsahcVb6zFdRXInv3h5Wn45Yl3k-gfg",
    authDomain: "saraketha-63b58.firebaseapp.com",
    databaseURL: "https://saraketha-63b58-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "saraketha-63b58",
    storageBucket: "saraketha-63b58.appspot.com",
    messagingSenderId: "54588119801",
    appId: "1:54588119801:web:94119b6cfe22d1bdc42028",
    measurementId: "G-CDP8HM86C0"
  
  };
  
  

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db,auth,storage};