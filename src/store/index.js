import { createStore } from "vuex";
import { auth, db } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const store = createStore({
  state: {
    kullanici: null,
    authDurum: false,
    sertifikalar: null,
  },
  mutations: {
    kullaniciDegistir(state, payload) {
      state.kullanici = payload;
      console.log(state.kullanici);
    },
    authDurumDegistir(state, payload) {
      state.authDurum = payload;
    },
    sertifikalarDoldur(state, payload) {
      state.sertifikalar = payload;
    },
  },
  actions: {
    async login(context, payload) {
      const res = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.parola
      );
      if (res) {
        context.commit("kullaniciDegistir", res.user);
      } else {
        throw new Error("Giriş işlemi gerçekleştirilemedi");
      }
    },
    async logout(context) {
      await signOut(auth);
      context.commit("kullaniciDegistir", null);
    },
    async sertifikalarGetir(context) {
      let sertifikalar = [];
      const colRef = collection(db, "sertifikalar");
      const q = query(colRef, orderBy("eklenmeTarih", "desc"));
      await getDocs(q)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            sertifikalar.push({ ...doc.data(), id: doc.id });
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      //console.log(sertifikalar);
      context.commit("sertifikalarDoldur", sertifikalar);
    },
  },

  modules: {},
  getters: {
    sertifikaGetir: (state) => (id) => {
      return state.sertifikalar.find((sertifika) => sertifika.id == id);
    },
    sertifikaNoGetir: (state) => (no) => {
      return state.sertifikalar.find(
        (sertifika) => sertifika.sertifikaNo === no
      );
    },
  },
});
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("authDurumDegistir", true);
  store.commit("kullaniciDegistir", user);
  unsub();
});
export default store;
