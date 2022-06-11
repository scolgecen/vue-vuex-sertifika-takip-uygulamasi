<template>
  <div class="row">
    <div class="col s12 m9 offset-m2 center-align">
      <div class="card grey lighten-4">
        <span class="card-title">Sertifika Bilgileri</span>
        <div class="card-content">
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">badge</i>
              <input
                id="sertifikaNo"
                type="text"
                class="validate"
                v-model="sertifikaNo"
              />
              <label for="sertifikaNo" class="active">Sertifika No:</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">money</i>
              <input id="not" type="text" class="validate" v-model="not" />
              <label for="not" class="active">Not:</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">face</i>
              <input
                id="ogrenciAd"
                type="text"
                class="validate"
                v-model="ogrenciAd"
              />
              <label for="ogrenciAd" class="active">Öğrenci Ad:</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">face</i>
              <input
                id="ogrenciSoyad"
                type="text"
                class="validate"
                v-model="ogrenciSoyad"
              />
              <label for="ogrenciSoyad" class="active">Öğrenci Soyad:</label>
            </div>
          </div>
          <div class="row">
            <div class="file-field input-field">
              <div class="btn orange">
                <span>File</span>
                <input type="file" @change="handleChange" />
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>

          <div class="card-action">
            <p v-if="hata" class="red-text">{{ hata }}</p>
            <a
              class="waves-effect waves-light btn orange accent-4 left"
              @click.prevent="handleBack"
            >
              Geri Dön <i class="material-icons left">arrow_back</i></a
            >
            <a
              class="waves-effect waves-light btn red accent-4 center"
              @click.prevent="handleDelete"
            >
              Sertifika Sil <i class="material-icons left">delete</i></a
            >

            <a
              class="waves-effect waves-light btn success accent-4 right"
              @click.prevent="handleUpdate"
            >
              Güncelle <i class="material-icons left">edit</i></a
            >
            <a
              class="waves-effect waves-light btn info accent-4 right"
              @click.prevent="handleHome"
              style="margin-right: 10px"
            >
              Anasayfa <i class="material-icons left">home</i></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import { db } from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import useStorage from "../composables/useStorage";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const id = route.params.id;
    const sertifika = store.getters.sertifikaGetir(id);
    console.log(sertifika);

    const dosya = ref(null);
    const hata = ref(null);
    const sertifikaNo = ref(sertifika.sertifikaNo);
    const not = ref(sertifika.not);
    const ogrenciAd = ref(sertifika.ogrenciAd);
    const ogrenciSoyad = ref(sertifika.ogrenciSoyad);

    const gecerliTip = ["application/pdf"];
    const handleChange = (e) => {
      let secilen = e.target.files[0];

      if (secilen && gecerliTip.includes(secilen.type)) {
        dosya.value = secilen;
        hata.value = null;
      } else {
        dosya.value = null;
        hata.value = "Lütfen pdf uzantılı bir dosya seçiniz";
      }
    };

    const handleBack = () => {
      router.go(-1);
    };
    const handleHome = () => {
      router.push("/");
    };
    const handleDelete = () => {
      try {
        const docRef = doc(db, "sertifikalar", id);
        deleteDoc(docRef)
          .then(() => {
            router.push("/liste");
          })
          .catch((err) => {
            hata.value = "Bir hata oluştu.Belge silinemedi";
          });
      } catch (error) {
        hata.value = "Bir hata oluştu.Belge silinemedi";
        hata.value = "";
      }
    };

    const { dosyaYukle, url } = useStorage();
    const handleUpdate = async () => {
      const docRef = doc(db, "sertifikalar", id);
      if (dosya.value) {
        await dosyaYukle(dosya.value);
        updateDoc(docRef, {
          sertifikaNo: sertifikaNo.value,
          not: not.value,
          ogrenciAd: ogrenciAd.value,
          ogrenciSoyad: ogrenciSoyad.value,
          sertifikaUrl: url.value,
        })
          .then(() => {
            router.push("/liste");
          })
          .catch((err) => {
            hata.value = "Bir hata oluştu. Belge Güncellenemedi";
          });
      } else {
        updateDoc(docRef, {
          sertifikaNo: sertifikaNo.value,
          not: not.value,
          ogrenciAd: ogrenciAd.value,
          ogrenciSoyad: ogrenciSoyad.value,
        })
          .then(() => {
            router.push("/liste");
          })
          .catch((err) => {
            hata.value = "Bir hata oluştu. Belge Güncellenemedi";
          });
      }
    };

    return {
      sertifikaNo,
      not,
      ogrenciAd,
      ogrenciSoyad,
      handleBack,
      handleHome,
      handleDelete,
      handleChange,
      handleUpdate,
    };
  },
};
</script>

<style></style>
