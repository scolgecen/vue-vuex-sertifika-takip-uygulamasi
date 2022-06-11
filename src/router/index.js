import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Giris from "../views/Giris.vue";
import Profil from "../views/Profil.vue";
import SertifikaListesi from "../views/SertifikaListesi.vue";
import SertifikaEkle from "../views/SertifikaEkle.vue";
import SertifikaIncele from "../views/SertifikaIncele.vue";
import { auth } from "../firebase/config";

const authKontrol = (to, from, next) => {
  const kullanici = auth.currentUser;
  if (!kullanici) {
    next({ name: "Giris" });
  } else {
    next();
  }
};
const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    beforeEnter: authKontrol,
  },
  {
    path: "/liste",
    name: "Liste",
    component: SertifikaListesi,
    beforeEnter: authKontrol,
  },
  {
    path: "/incele/:id",
    name: "Incele",
    component: SertifikaIncele,
    beforeEnter: authKontrol,
  },
  {
    path: "/ekle",
    name: "Ekle",
    component: SertifikaEkle,
    beforeEnter: authKontrol,
  },
  { path: "/giris", name: "Giris", component: Giris },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
