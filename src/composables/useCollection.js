import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
const useCollection = (koleksiyonId) => {
  const belgeHata = ref(null);
  const belgeEkle = async (belge) => {
    belgeHata.value = null;

    try {
      const koleksiyonRef = await collection(db, koleksiyonId);
      await addDoc(koleksiyonRef, belge);
    } catch (error) {
      belgeHata.value = "Belge Eklenemedi";
    }
  };

  return { belgeEkle, belgeHata };
};
export default useCollection;
