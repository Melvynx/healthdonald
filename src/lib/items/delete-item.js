import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase";
import { useUserStore } from "../store/user-store";
import { getItem } from "./get-item";

export const deleteItem = async (id) => {
  if (!useUserStore.getState().isAdmin) {
    throw new Error("You are not allowed to delete this item");
  }

  const item = await getItem(id);

  if (item) {
    if (item.imagePath) {
      const storageRef = ref(storage, item.imagePath);
      deleteObject(storageRef);
    }
  }
  await deleteDoc(doc(db, "items", id));
};
