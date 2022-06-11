<template>
  <div class="row">
    <div class="col s12 m8 offset-m2 center-align">
      <div class="card grey lighten-4">
        <span class="card-title">Sertifika Arama </span>
        <a
          class="btn-floating halfway-fab waves-effect waves-light orange accent-4 pulse"
          @click.prevent="handleClick"
        >
          <i class="material-icons">search</i>
        </a>

        <div class="card-content">
          <p>
            Aradığınız sertifikayı bulmak için lütfen sertifika numaranızı doğru
            bir şekilde giriniz.
          </p>
          <div class="row">
            <div class="input-field col s12">
              <input id="sertifika_no" type="text" v-model="sertifikaNo" />
              <label for="sertifika_no">Sertifika No:</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Transition name="hata">
      <div v-if="hata" class="col s12 m8 offset-m2 center-align">
        <div class="card red lighten-4">
          <span class="card-title">Sertifika Arama Sonucu </span>

          <div class="card-content">
            <p>{{ hata }}</p>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="sertifika">
      <div v-if="sertifikaBilgisi != ''" class="col s12 m8 offset-m2">
        <div class="card grey lighten-4">
          <div class="card-content black-text">
            <span class="card-title">Sertifika Bilgisi</span>
            <div class="row">
              <div class="col s4 m4">
                <p>
                  <b class="">Öğrenci :</b> {{ sertifikaBilgisi.ogrenciAd }}
                  {{ sertifikaBilgisi.ogrenciSoyad }}
                </p>
              </div>
              <div class="col s4 m4">
                <p><b>Not :</b> {{ sertifikaBilgisi.not }}</p>
              </div>
              <div class="col s4 m4">
                <a
                  :href="sertifikaBilgisi.sertifikaUrl"
                  target="_blank"
                  class="btn btn-success"
                  >Sertifika İncele</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  name: "Home",
  components: {},
  setup() {
    const sertifikaNo = ref("");
    const store = useStore();
    const hata = ref(null);
    const sertifikaBilgisi = ref("");

    store.dispatch("sertifikalarGetir");
    const sertifikalar = computed(() => store.state.sertifikalar);
    //console.log(sertifikalar);
    const handleClick = () => {
      sertifikaBilgisi.value = "";
      hata.value = null;
      const sertifika = store.getters.sertifikaNoGetir(sertifikaNo.value);
      if (sertifika === undefined) {
        hata.value = sertifikaNo.value + " numaralı sertifika bulunamadı";
      } else {
        sertifikaBilgisi.value = sertifika;
      }
    };

    return {
      sertifikaNo,
      handleClick,
      hata,
      sertifikaBilgisi,
    };
  },
};
</script>

<style>
/* label color */
.input-field label {
  color: #000 !important;
}
/* label focus color */
.input-field input[type="text"]:focus + label {
  color: orangered !important;
}
/* label underline focus color */
.input-field input[type="text"]:focus {
  border-bottom: 1px solid orangered !important;
  box-shadow: 0 1px 0 0 orangered !important;
}

.row {
  margin-top: 25px;
}

.hata-enter-active,
.hata-leave-active {
  transition: opacity 2s ease;
}

.hata-enter-from,
.hata-leave-to {
  opacity: 0;
}

.sertifika-enter-active,
.sertifika-leave-active {
  transition: opacity 2s ease;
}

.sertifika-enter-from,
.sertifika-leave-to {
  opacity: 0;
}
</style>
