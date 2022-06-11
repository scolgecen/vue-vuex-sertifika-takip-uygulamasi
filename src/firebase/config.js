import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrwHKEa0lsz1tEZE8SfazUZsFwBUUsNOQ",
  authDomain: "sertifika-takip-uygulamasi.firebaseapp.com",
  projectId: "sertifika-takip-uygulamasi",
  storageBucket: "sertifika-takip-uygulamasi.appspot.com",
  messagingSenderId: "875977330243",
  appId: "1:875977330243:web:2aead33d413de26e584ef6",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const tarih = serverTimestamp();
const storage = getStorage();

export { auth, db, storage, tarih };
