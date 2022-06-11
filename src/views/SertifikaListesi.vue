<template>
  <div>
    <div class="row">
      <div class="col s12 m12">
        <div class="card orange accent-2">
          <div class="card-content black-text">
            <span class="card-title black-text low-text center-align"
              >Sertifika Listesi</span
            >

            <ul class="collapsible">
              <li
                v-for="sertifika in sertifikalar"
                :key="sertifika.sertifikaNo"
              >
                <div class="collapsible-header">
                  <i class="material-icons orange-text">article</i
                  >{{ sertifika.ogrenciAd }} {{ sertifika.ogrenciSoyad }}
                </div>
                <div class="collapsible-body black-text low-text">
                  <span>Not : {{ sertifika.not }}</span>
                  <button
                    class="right btn blue-grey darken-1"
                    @click="sertifikaIncele(sertifika.id)"
                  >
                    İNCELE
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    onMounted(() => {
      M.AutoInit();
    });
    const store = useStore();
    const router = useRouter();
    store.dispatch("sertifikalarGetir");
    const sertifikalar = computed(() => store.state.sertifikalar);
    const sertifikaIncele = (id) => {
      //console.log(id);
      router.push({ name: "Incele", params: { id } });
    };
    //console.log(sertifikalar);
    return {
      sertifikalar,
      sertifikaIncele,
    };
    //console.log(store.state.sertifikalar);
  },
};
</script>

<style></style>
