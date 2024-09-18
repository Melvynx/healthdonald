import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";
import { db, storage } from "../firebase";

export const setItem = async (id, item) => {
  if (item.image instanceof File) {
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
