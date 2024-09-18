import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase";
import { getItem } from "./get-item";

export const deleteItem = async (id) => {
  const item = await getItem(id);

  if (item) {
    if (item.imagePath) {
      const storageRef = ref(storage, item.imagePath);
      deleteObject(storageRef);
    }
  }
  await deleteDoc(doc(db, "items", id));
};
