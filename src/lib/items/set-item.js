import { collection, doc, setDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { toast } from "sonner";
import { db, storage } from "../firebase";
import { useUserStore } from "../store/user-store";

export const setItem = async (id, item) => {
  if (!useUserStore.getState().isAdmin) {
    throw new Error("You are not allowed to delete this item");
  }

  if (item.image instanceof File) {
    // Si l'item à déjà une image
    if (item.imagePath) {
      const storageRef = ref(storage, item.imagePath);
      await deleteObject(storageRef);
    }

    const storageRefName = `images/${item.image.name}`;
    const storageRef = ref(storage, storageRefName);
    try {
      await uploadBytes(storageRef, item.image);
      const downloadURL = await getDownloadURL(storageRef);

      item.image = downloadURL;
      item.imagePath = storageRefName;
    } catch {
      toast.error("Error uploading image");
      return;
    }
  }

  const itemRef = collection(db, "items");
  await setDoc(doc(itemRef, id), item);
};
